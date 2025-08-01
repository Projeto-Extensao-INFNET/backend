/*
  Warnings:

  - Added the required column `document` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ROLE" AS ENUM ('PATIENT', 'PROFESSIONAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('CPF', 'RG');

-- CreateEnum
CREATE TYPE "public"."TypeOfQuery" AS ENUM ('ONLINE_VIDEO_CALL', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('PIX', 'CREDIT_CARD');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'TRANSGENDER', 'NON_BINARY');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "document_type" "public"."DocumentType" NOT NULL DEFAULT 'CPF',
ADD COLUMN     "role" "public"."ROLE" NOT NULL;

-- CreateTable
CREATE TABLE "public"."specialty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professionals" (
    "id" TEXT NOT NULL,
    "type_of_query" "public"."TypeOfQuery" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payment_method" "public"."PaymentMethod" NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "avatar" TEXT NOT NULL,
    "phone" TEXT,
    "user_id" TEXT NOT NULL,
    "specialty_id" TEXT NOT NULL,
    "type_of_treatment" TEXT NOT NULL,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."types_of_treatment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "types_of_treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professional_and_patient" (
    "id" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "professional_and_patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."schedules" (
    "id" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "schedules" TIMESTAMP(3) NOT NULL,
    "professional_id" TEXT NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_agenda" (
    "id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "user_agenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."professionals" ADD CONSTRAINT "professionals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professionals" ADD CONSTRAINT "professionals_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "public"."specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professionals" ADD CONSTRAINT "professionals_type_of_treatment_fkey" FOREIGN KEY ("type_of_treatment") REFERENCES "public"."types_of_treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professional_and_patient" ADD CONSTRAINT "professional_and_patient_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professional_and_patient" ADD CONSTRAINT "professional_and_patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."schedules" ADD CONSTRAINT "schedules_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_agenda" ADD CONSTRAINT "user_agenda_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
