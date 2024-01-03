/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Enrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_sectionId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "sectionId";
