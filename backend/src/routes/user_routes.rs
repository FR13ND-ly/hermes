use axum::Router;
use axum::routing::{delete, get, post};
use sqlx::PgPool;
use crate::controllers::user_controller::{login, register};

pub fn routes(pool: PgPool) -> Router {
    Router::new()
        .route("/users/register", post(register))
        .route("/users/login", post(login))
        .with_state(pool)
}