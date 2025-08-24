use axum::{
    extract::{Multipart, State, Path, Query, Json},
    http::StatusCode,
    response::{IntoResponse},
};
use sqlx::PgPool;
use chrono::{NaiveDateTime, Utc};
use uuid::Uuid;
use tokio::fs;
use crate::models::file::{File, CreateFile, FileResponse};
use std::path::Path as StdPath;
use std::collections::HashMap;
use serde::Deserialize;

async fn get_project_path(pool: &PgPool, project_id: Uuid) -> Result<String, sqlx::Error> {
    let project_name: String = sqlx::query_scalar("SELECT name FROM projects WHERE id = $1")
        .bind(project_id)
        .fetch_one(pool)
        .await?;
    let base_path = format!("../media_files/{}", project_name);
    Ok(base_path)
}

#[derive(Deserialize)]
pub struct GetFilesQuery {
    project_id: Uuid,
    path: Option<String>,
}

// Represents a row from the 'files' table.
#[derive(sqlx::FromRow)]
struct FileRecord {
    id: Uuid,
    project_id: Uuid,
    name: String,
    path: String,
    created: NaiveDateTime,
    last_modified: NaiveDateTime,
    is_folder: bool,
}

pub async fn get_files(
    State(pool): State<PgPool>,
    Query(params): Query<GetFilesQuery>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
    let project_id = params.project_id;
    let path = params.path.unwrap_or_default();

    let base_path = get_project_path(&pool, project_id)
        .await
        .map_err(|_| (StatusCode::NOT_FOUND, "Project not found".to_string()))?;

    if !StdPath::new(&base_path).exists() {
        return Err((StatusCode::NOT_FOUND, "Project path does not exist".to_string()));
    }

    let full_path = if path.is_empty() {
        base_path.clone()
    } else {
        format!("{}/{}", base_path, path)
    };

    if !StdPath::new(&full_path).exists() {
        return Err((StatusCode::NOT_FOUND, format!("Path '{}' does not exist", path)));
    }

    let db_files = if path.is_empty() {
        sqlx::query_as::<_, (Uuid, String, String, chrono::NaiveDateTime, chrono::NaiveDateTime, bool)>(
            "SELECT id, name, path, created, last_modified, is_folder
             FROM files
             WHERE project_id = $1 AND path NOT LIKE '%/%'"
        )
            .bind(project_id)
            .fetch_all(&pool)
            .await
            .map_err(|e| {
                eprintln!("Database error: {:?}", e);
                (StatusCode::INTERNAL_SERVER_ERROR, "Failed to fetch files".to_string())
            })?
    } else {
        let like_pattern = format!("{}/%", path);
        let not_like_pattern = format!("{}/%/%", path);

        sqlx::query_as::<_, (Uuid, String, String, chrono::NaiveDateTime, chrono::NaiveDateTime, bool)>(
            "SELECT id, name, path, created, last_modified, is_folder
             FROM files
             WHERE project_id = $1 AND path LIKE $2 AND path NOT LIKE $3"
        )
            .bind(project_id)
            .bind(like_pattern)
            .bind(not_like_pattern)
            .fetch_all(&pool)
            .await
            .map_err(|e| {
                eprintln!("Database error: {:?}", e);
                (StatusCode::INTERNAL_SERVER_ERROR, "Failed to fetch files".to_string())
            })?
    };

    let mut file_responses = Vec::new();

    for (id, name, db_path, created, last_modified, is_folder) in db_files {
        let (size, file_type) = if is_folder {
            (0, "folder".to_string())
        } else {
            let physical_path = format!("{}/{}", base_path, db_path);
            let size = match fs::metadata(&physical_path).await {
                Ok(metadata) => metadata.len(),
                Err(_) => 0,
            };

            let file_type = StdPath::new(&name)
                .extension()
                .and_then(std::ffi::OsStr::to_str)
                .unwrap_or("unknown")
                .to_string();

            (size, file_type)
        };

        let response = FileResponse {
            id: id.to_string(),
            project_id: project_id.to_string(),
            name,
            file_type,
            size,
            path: db_path,
            last_modified: Some(last_modified),
            created: Some(created),
            is_folder,
        };

        file_responses.push(response);
    }

    Ok((StatusCode::OK, Json(file_responses)))
}


#[derive(Debug, serde::Deserialize)]
pub struct UploadParams {
    pub project_id: Uuid,
    pub path: Option<String>,
    pub is_folder: Option<bool>,
}

pub async fn upload_file(
    State(pool): State<PgPool>,
    Query(params): Query<UploadParams>,
    mut multipart: Multipart,
) -> (StatusCode, Json<Vec<FileResponse>>) {
    // Extract metadata from request params (no Option juggling inside)
    let project_id = params.project_id;
    let upload_path = params.path.unwrap_or_default();
    let is_folder = params.is_folder.unwrap_or(false);

    assert!(!is_folder, "Use the create_folder endpoint for folders.");

    let base_path = get_project_path(&pool, project_id).await.expect("Project not found");
    assert!(StdPath::new(&base_path).exists(), "Project path does not exist");

    if !upload_path.is_empty() {
        let full_upload_path = format!("{}/{}", base_path, upload_path);
        assert!(StdPath::new(&full_upload_path).exists(), "Upload path does not exist");
    }

    let mut created_files = Vec::new();

    // Process file fields directly
    while let Some(field) = multipart.next_field().await.expect("Failed to read field") {
        let file_name = field.file_name().unwrap_or("unknown_file").to_string();
        let data = field.bytes().await.expect("Failed to read file data");
        let file_size = data.len() as u64;

        let file_type = StdPath::new(&file_name)
            .extension()
            .and_then(std::ffi::OsStr::to_str)
            .unwrap_or("unknown")
            .to_string();

        let file_dir = if upload_path.is_empty() {
            base_path.clone()
        } else {
            format!("{}/{}", base_path, upload_path)
        };

        assert!(StdPath::new(&file_dir).exists(), "Upload directory does not exist");

        let physical_file_path = format!("{}/{}", file_dir, file_name);
        let db_path = if upload_path.is_empty() {
            file_name.clone()
        } else {
            format!("{}/{}", upload_path, file_name)
        };

        fs::write(&physical_file_path, &data).await.expect("Failed to write file");

        let new_file_id = Uuid::new_v4();
        let now = Utc::now().naive_utc();

        sqlx::query(
            "INSERT INTO files (id, project_id, name, path, created, last_modified, is_folder)
             VALUES ($1, $2, $3, $4, $5, $6, false)",
        )
            .bind(new_file_id)
            .bind(project_id)
            .bind(&file_name)
            .bind(&db_path)
            .bind(now)
            .bind(now)
            .execute(&pool)
            .await
            .expect("Failed to save file metadata");

        created_files.push(FileResponse {
            id: new_file_id.to_string(),
            project_id: project_id.to_string(),
            name: file_name,
            file_type,
            size: file_size,
            path: db_path,
            last_modified: Some(now),
            created: Some(now),
            is_folder: false,
        });
    }

    assert!(!created_files.is_empty(), "No files were uploaded");

    (StatusCode::CREATED, Json(created_files))
}

pub async fn create_folder(
    State(pool): State<PgPool>,
    Json(payload): Json<CreateFile>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
    if !payload.is_folder {
        return Err((StatusCode::BAD_REQUEST, "Use the upload_file endpoint for files.".to_string()));
    }

    let base_path = get_project_path(&pool, payload.project_id)
        .await
        .map_err(|_| (StatusCode::NOT_FOUND, "Project not found".to_string()))?;

    let db_path = if payload.path.is_empty() {
        payload.name.clone()
    } else {
        format!("{}/{}", payload.path, payload.name)
    };
    
    let physical_folder_path = format!("{}/{}", base_path, db_path);
    
    fs::create_dir_all(&physical_folder_path)
        .await
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Could not create folder".to_string()))?;

    let new_folder_id = Uuid::new_v4();
    let now = Utc::now().naive_utc();

    sqlx::query(
        "INSERT INTO files (id, project_id, name, path, created, last_modified, is_folder)
         VALUES ($1, $2, $3, $4, $5, $6, true)",
    )
    .bind(new_folder_id)
    .bind(payload.project_id)
    .bind(&payload.name)
    .bind(&db_path)
    .bind(now)
    .bind(now)
    .execute(&pool)
    .await
    .map_err(|e| {
        eprintln!("Failed to save folder metadata. DB error: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, "Failed to save folder metadata".to_string())
    })?;
    
    let response = FileResponse {
        id: new_folder_id.to_string(),
        project_id: payload.project_id.to_string(),
        name: payload.name.clone(),
        file_type: "folder".to_string(),
        size: 0,
        path: db_path,
        last_modified: Some(now),
        created: Some(now),
        is_folder: true,
    };

    Ok((StatusCode::CREATED, Json(response)))
}

pub async fn delete_file_or_folder(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> StatusCode {
    if let Ok(Some((project_id, rel_path, is_folder))) =
        sqlx::query_as::<_, (Uuid, String, bool)>(
            "SELECT project_id, path, is_folder FROM files WHERE id = $1",
        )
        .bind(id)
        .fetch_optional(&pool)
        .await
    {
        let base_path = match get_project_path(&pool, project_id).await {
            Ok(p) => p,
            Err(_) => return StatusCode::NOT_FOUND,
        };

        let abs_path = format!("{}/{}", base_path, rel_path);

        let fs_result = if is_folder {
            fs::remove_dir_all(&abs_path).await
        } else {
            fs::remove_file(&abs_path).await
        };

        if fs_result.is_err() {
            return StatusCode::INTERNAL_SERVER_ERROR;
        }

        if sqlx::query("DELETE FROM files WHERE id = $1")
            .bind(id)
            .execute(&pool)
            .await
            .is_err()
        {
            return StatusCode::INTERNAL_SERVER_ERROR;
        }

        StatusCode::NO_CONTENT
    } else {
        StatusCode::NOT_FOUND
    }
}