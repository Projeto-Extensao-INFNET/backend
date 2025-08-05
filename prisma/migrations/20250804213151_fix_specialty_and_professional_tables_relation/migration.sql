/*
  Warnings:

  - A unique constraint covering the columns `[specialty_id]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.
  - Made the column `birth_date` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "birth_date" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "professionals_specialty_id_key" ON "public"."professionals"("specialty_id");
