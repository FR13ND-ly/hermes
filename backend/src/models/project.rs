use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, sqlx::FromRow)]
pub struct Project {
    pub id: Uuid,
    pub name: String,
    pub user_id: Uuid,
    pub project_type: String,
    pub api_key: Uuid,
}

#[derive(Deserialize)]
pub struct CreateProject {
    pub name: String,
    pub user_id: Uuid,
    pub project_type: String,
}


#[derive(Serialize, sqlx::FromRow)]
pub struct MediaStore {
    pub id: Uuid,
    pub project_id: Uuid,
    pub media_url: String,
}