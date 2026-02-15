/*
  Warnings:

  - You are about to drop the column `avatar` on the `professionals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT;
