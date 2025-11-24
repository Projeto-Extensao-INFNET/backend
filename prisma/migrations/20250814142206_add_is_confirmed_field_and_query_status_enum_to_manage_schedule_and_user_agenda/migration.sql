/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `query_status` to the `user_agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_agenda` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."QueryStatus" AS ENUM ('CANCELED', 'COMPLETED', 'SCHEDULED');

-- AlterTable
ALTER TABLE "public"."schedules" DROP COLUMN "isAvailable",
ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_confirmed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."user_agenda" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "query_status" "public"."QueryStatus" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
