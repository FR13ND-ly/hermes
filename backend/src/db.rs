use sqlx::postgres::PgPoolOptions;
use std::env;
use std::sync::Arc;
use axum::extract::State;
use crate::config::Config;

pub async fn connect() -> sqlx::PgPool {
    dotenvy::dotenv().ok();
    let database_url = Config::from_env().unwrap().database_url.clone();
    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool")
}
