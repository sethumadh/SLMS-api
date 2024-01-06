/*
  Warnings:

  - You are about to drop the `TeacherBankDetailss` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherBankDetailss" DROP CONSTRAINT "TeacherBankDetailss_teacherId_fkey";

-- DropTable
DROP TABLE "TeacherBankDetailss";

-- CreateTable
CREATE TABLE "TeacherBankDetails" (
    "id" SERIAL NOT NULL,
    "bankAccountName" TEXT NOT NULL,
    "BSB" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ABN" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherBankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherBankDetails_teacherId_key" ON "TeacherBankDetails"("teacherId");

-- AddForeignKey
ALTER TABLE "TeacherBankDetails" ADD CONSTRAINT "TeacherBankDetails_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
