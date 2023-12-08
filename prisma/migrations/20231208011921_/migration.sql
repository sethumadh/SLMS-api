/*
  Warnings:

  - A unique constraint covering the columns `[subjectEnrollmentId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,termSubjectGroupId,subjectEnrollmentId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enrollmentId]` on the table `SubjectEnrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectEnrollmentId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "subjectEnrollmentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_subjectEnrollmentId_key" ON "Enrollment"("subjectEnrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_termSubjectGroupId_subjectEnrollmentId_key" ON "Enrollment"("studentId", "termSubjectGroupId", "subjectEnrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectEnrollment_enrollmentId_key" ON "SubjectEnrollment"("enrollmentId");
