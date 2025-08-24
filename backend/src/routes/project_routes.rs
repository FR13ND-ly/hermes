use axum::{Router, routing::{post, delete}};
use sqlx::PgPool;
use crate::controllers::project_controller::*;

pub fn routes(pool: PgPool) -> Router {
    Router::new()
        .route("/projects", post(create_project).get(get_projects))
        .route("/projects/:id", delete(delete_project))
        .with_state(pool.clone())
}