/*
  Warnings:

  - You are about to drop the column `schedules` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the `professional_and_patient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[professional_id,start_at]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schedule_id]` on the table `user_agenda` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."professional_and_patient" DROP CONSTRAINT "professional_and_patient_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."professional_and_patient" DROP CONSTRAINT "professional_and_patient_user_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "schedules",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_at" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "start_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_agenda" ADD COLUMN     "canceled_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "public"."professional_and_patient";

-- CreateIndex
CREATE UNIQUE INDEX "schedules_professional_id_start_at_key" ON "schedules"("professional_id", "start_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_agenda_schedule_id_key" ON "user_agenda"("schedule_id");
