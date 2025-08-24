use axum::{extract::{State, Path}, Json};
use axum::http::StatusCode;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::project::{Project, CreateProject, MediaStore};

pub async fn get_projects(State(pool): State<PgPool>) -> Json<Vec<Project>> {
    let projects = sqlx::query_as::<_, Project>("SELECT * FROM projects")
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(projects)
}

pub async fn create_project(
    State(pool): State<PgPool>,
    Json(request): Json<CreateProject>,
) -> (StatusCode, Json<Project>) {
    let api_key = Uuid::new_v4();

    let project = sqlx::query_as::<_, Project>(
        "INSERT INTO projects (id, name, user_id, project_type, api_key) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *",
    )
    .bind(Uuid::new_v4())
    .bind(&request.name)
    .bind(request.user_id)
    .bind(&request.project_type)
    .bind(&api_key)
    .fetch_one(&pool)
    .await
    .unwrap();

    if project.project_type == "media_store" {

        let media_folder = format!("../media_files/{}", project.name);

        std::fs::create_dir_all(&media_folder).unwrap();

        sqlx::query("INSERT INTO media_stores (id, project_id, media_url) VALUES ($1, $2, $3)")
            .bind(Uuid::new_v4())
            .bind(project.id)
            .bind(media_folder)
            .execute(&pool)
            .await
            .unwrap();
    }

    (StatusCode::CREATED, Json(project))
}

pub async fn get_project_by_id(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> Result<Json<Project>, StatusCode> {
    let project = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await
        .unwrap();

    match project {
        Some(p) => Ok(Json(p)),
        None => Err(StatusCode::NOT_FOUND),
    }
}


pub async fn delete_project(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> StatusCode {
    let folder_path: Option<String> = sqlx::query_scalar!(
        "SELECT media_url FROM media_stores WHERE project_id = $1",
        id
    )
    .fetch_optional(&pool)
    .await
    .unwrap_or(None);

    if let Some(path) = folder_path {
        if let Err(e) = std::fs::remove_dir_all(&path) {
            eprintln!("Warning: Failed to delete folder {:?}: {}", path, e);
        }
    }

    let result = sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .unwrap();

    if result.rows_affected() == 0 {
        StatusCode::NOT_FOUND
    } else {
        StatusCode::NO_CONTENT
    }
}