#[derive(Clone)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
    pub file_storage_path: String,
    pub public_url_prefix: String,
}

impl Config {
    pub fn from_env() -> Result<Self, dotenvy::Error> {
        dotenvy::dotenv().ok();
        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let jwt_secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let file_storage_path = std::env::var("FILE_STORAGE_PATH").expect("FILE_STORAGE_PATH must be set");
        let public_url_prefix = std::env::var("PUBLIC_URL_PREFIX").expect("PUBLIC_URL_PREFIX must be set");

        Ok(Self {
            database_url,
            jwt_secret,
            file_storage_path,
            public_url_prefix,
        })
    }
}