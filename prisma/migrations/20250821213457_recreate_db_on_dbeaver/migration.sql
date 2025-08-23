/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "professionals_document_key" ON "public"."professionals"("document");
