/*
  Warnings:

  - You are about to drop the column `accountName` on the `TeacherBankDetailss` table. All the data in the column will be lost.
  - Added the required column `bankAccountName` to the `TeacherBankDetailss` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeacherBankDetailss" DROP COLUMN "accountName",
ADD COLUMN     "bankAccountName" TEXT NOT NULL;
