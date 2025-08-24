use axum::{Router, routing::{get, post, delete}};
use sqlx::PgPool;
use crate::controllers::file_controller::*;


pub fn routes(pool: PgPool) -> Router {
    Router::new()
        .route("/files", get(get_files).post(upload_file))
        .route("/files/folder", post(create_folder))
        .route("/files/:id", delete(delete_file_or_folder))
        .with_state(pool)
}