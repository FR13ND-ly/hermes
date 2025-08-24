use axum::http::StatusCode;
use chrono::Utc;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use crate::config::Config;
use crate::models::user::{Claims, User};

fn now_ts() -> usize { Utc::now().timestamp() as usize }

pub fn make_jwt(user: &User) -> Result<String, StatusCode> {
    let iat = now_ts();
    let claims = Claims {
        sub: user.id.to_string(),
        email: user.email.clone(),
        iat
    };
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(Config::from_env().unwrap().jwt_secret.as_bytes()),
    ).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(token)
}


pub fn decode_jwt(token: &str) -> Result<Claims, StatusCode> {
    let mut validation = Validation::default();
    decode::<Claims>(token, &DecodingKey::from_secret(Config::from_env().unwrap().jwt_secret.as_bytes()), &validation)
        .map(|d| d.claims)
        .map_err(|_| StatusCode::UNAUTHORIZED)
}


