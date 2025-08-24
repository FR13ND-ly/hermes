use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::NaiveDateTime;

#[derive(Serialize, sqlx::FromRow)]
pub struct File {
    pub id: Uuid,
    pub project_id: Uuid,
    pub name: String,
    pub path: String,
    pub created: NaiveDateTime,
    pub last_modified: NaiveDateTime,
    pub is_folder: bool,
}

#[derive(Deserialize)]
pub struct CreateFile {
    pub project_id: Uuid,
    pub name: String,
    pub path: String,
    pub is_folder: bool,
}

#[derive(serde::Serialize)]
pub struct FileResponse {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub file_type: String,
    pub size: u64,
    pub path: String,
    pub last_modified: Option<chrono::NaiveDateTime>,
    pub created: Option<chrono::NaiveDateTime>,
    pub is_folder: bool,
}