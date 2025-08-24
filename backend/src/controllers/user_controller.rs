use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;
use crate::models::user::{AuthResponse, LoginRequest, RegisterRequest, User};
use std::env;
use axum::response::IntoResponse;
use crate::utils::hash::{hash_password, verify_password};
use crate::utils::jwt::make_jwt;

pub async fn register(
    State(pool): State<PgPool>,
    Json(body): Json<RegisterRequest>,
) -> (StatusCode, Json<AuthResponse>) {
    let hash = hash_password(&body.password).await.expect("Failed to create hash");;
    dotenvy::dotenv().ok();

    let user: User = sqlx::query_as(
        "INSERT INTO users (id, email, password_hash, created_at)
         VALUES ($1, $2, $3, $4) RETURNING *"
    )
        .bind(Uuid::new_v4())
        .bind(&body.email)
        .bind(&hash)
        .bind(Utc::now().naive_utc())
        .fetch_one(&pool)
        .await
        .unwrap();
    let token = make_jwt(&user);

    (
        StatusCode::CREATED,
        Json(AuthResponse {
            access_token: token.expect("REASON"),
            token_type: "Bearer".into(),
        })
    )
}

pub async fn login(
    State(pool): State<PgPool>,
    Json(body): Json<LoginRequest>,
) -> impl IntoResponse {
    let user: Option<User> = sqlx::query_as("SELECT * FROM users WHERE email = $1")
        .bind(&body.email)
        .fetch_optional(&pool)
        .await
        .unwrap();

    if let Some(user) = user {
        if verify_password(&user.password_hash, &body.password).expect("REASON") {
            let token = make_jwt(&user).expect("REASON");
            return Ok(Json(AuthResponse {
                access_token: token,
                token_type: "Bearer".into(),
            }));
        }
    }

    Err(StatusCode::UNAUTHORIZED)
}