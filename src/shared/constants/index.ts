import { env } from '../../config/env';

export const SALT_ROUNDS = 8;
export const MIN_PASSWORD_LENGTH = 8;

export const PORT = env.PORT;
export const DEV_CORS_ORIGIN = env.DEV_CORS_ORIGIN;
export const COOKIES_MAX_AGE = 60 * 15; // 15 min

export const REDIS_PORT = env.REDIS_PORT;
export const REDIS_DB = env.REDIS_DB;
export const REDIS_HOST = env.REDIS_HOST;
export const REDIS_CACHE_EXPIRATION = 60 * 15; // 15 min

export const JWT_SECRET = env.JWT_SECRET;
export const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION = env.JWT_ACCESS_TOKEN_EXPIRATION;
export const JWT_REFRESH_TOKEN_EXPIRATION = env.JWT_REFRESH_TOKEN_EXPIRATION;

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_LIMIT = 10;

export const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
