/*
  Warnings:

  - You are about to drop the column `is_confirmed` on the `user_agenda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_agenda" DROP COLUMN "is_confirmed",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;
