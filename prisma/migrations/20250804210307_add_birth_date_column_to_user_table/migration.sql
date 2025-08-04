/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `professionals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProfessionalDocumentType" AS ENUM ('CRM', 'CRP');

-- AlterTable
ALTER TABLE "public"."professionals" ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "document_type" "public"."ProfessionalDocumentType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "birth_date" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "professionals_user_id_key" ON "public"."professionals"("user_id");
