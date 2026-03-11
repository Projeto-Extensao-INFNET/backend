-- Add refresh token column to users table
ALTER TABLE "users"
ADD COLUMN "refresh_token" TEXT;
