/*
  Warnings:

  - You are about to drop the column `enrollmentId` on the `FeePayment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeePayment" DROP CONSTRAINT "FeePayment_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "FeePayment" DROP COLUMN "enrollmentId",
ADD COLUMN     "studentTermFeeId" INTEGER;

-- CreateTable
CREATE TABLE "StudentTermFee" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "termSubjectGroupId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "StudentTermFee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentTermFee_studentId_termSubjectGroupId_termId_key" ON "StudentTermFee"("studentId", "termSubjectGroupId", "termId");

-- AddForeignKey
ALTER TABLE "StudentTermFee" ADD CONSTRAINT "StudentTermFee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermFee" ADD CONSTRAINT "StudentTermFee_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermFee" ADD CONSTRAINT "StudentTermFee_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_studentTermFeeId_fkey" FOREIGN KEY ("studentTermFeeId") REFERENCES "StudentTermFee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
