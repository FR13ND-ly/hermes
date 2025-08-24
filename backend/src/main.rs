mod db;
mod models;
mod routes;
mod controllers;
mod utils;
mod config;

use axum::Router;
use dotenvy::dotenv;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use crate::routes::project_routes::routes as project_routes;
use crate::routes::file_routes::routes as file_routes;
use crate::routes::user_routes::routes as user_routes;

// 1. Import the necessary components from tower_http and axum::http
use tower_http::cors::{CorsLayer, Any};
use axum::http::{Method, header};


#[tokio::main]
async fn main() {
    dotenv().ok();
    let pool = db::connect().await;

    let cors = CorsLayer::new()
        .allow_origin(Any) // Allows any origin
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_headers([header::AUTHORIZATION, header::ACCEPT, header::CONTENT_TYPE]);

    let app = Router::new()
        .merge(file_routes(pool.clone()))
        .merge(project_routes(pool.clone()))
        .merge(user_routes(pool.clone()))
        .layer(cors);


    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();

    println!("🚀 Listening on http://{}", addr);

    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}