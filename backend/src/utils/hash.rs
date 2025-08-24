use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use axum::http::StatusCode;

pub async fn hash_password(plain: &str) -> Result<String, StatusCode> {
    let salt = SaltString::generate(&mut OsRng);
    Argon2::default()
        .hash_password(plain.as_bytes(), &salt)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
        .map(|ph| ph.to_string())
}

pub fn verify_password(hash: &str, plain: &str) -> Result<bool, StatusCode> {
    let parsed = PasswordHash::new(hash).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Argon2::default().verify_password(plain.as_bytes(), &parsed).is_ok())
}