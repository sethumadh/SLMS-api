/*
  Warnings:

  - You are about to drop the column `feeId` on the `TermSubject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TermSubject" DROP CONSTRAINT "TermSubject_feeId_fkey";

-- AlterTable
ALTER TABLE "TermSubject" DROP COLUMN "feeId";
