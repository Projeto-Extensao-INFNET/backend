export const SALT_ROUNDS = 8;

export const MIN_PASSWORD_LENGTH = 8;

export const PORT = 3333;

export const COOKIES_MAX_AGE = 24 * 60 * 60 * 1000; // 24h

export const REDIS_PORT = 6379;
export const REDIS_DB = 0;
export const REDIS_HOST = '127.0.0.1';
export const REDIS_CACHE_EXPIRATION = 60 * 15; // 15 min

export const JWT_ACCESS_TOKEN_EXPIRATION = '15m';
export const JWT_REFRESH_TOKEN_EXPIRATION = '24h';

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_LIMIT = 10;

export const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

export const DEV_CORS_ORIGIN = 'http://localhost:';
