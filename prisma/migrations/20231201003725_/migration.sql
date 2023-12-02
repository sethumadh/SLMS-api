/*
  Warnings:

  - You are about to drop the column `subjectGroupId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `_LevelToTermSubjectGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_subjectGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TermSubjectGroup" DROP CONSTRAINT "TermSubjectGroup_feeId_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToTermSubjectGroup" DROP CONSTRAINT "_LevelToTermSubjectGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToTermSubjectGroup" DROP CONSTRAINT "_LevelToTermSubjectGroup_B_fkey";

-- DropIndex
DROP INDEX "PersonalDetails_firstName_lastName_DOB_email_key";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "subjectGroupId";

-- AlterTable
ALTER TABLE "SubjectGroup" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "_LevelToTermSubjectGroup";

-- CreateTable
CREATE TABLE "TermSubjectGroupSubject" (
    "id" SERIAL NOT NULL,
    "termId" INTEGER NOT NULL,
    "subjectGroupId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "termSubjectGroupId" INTEGER,
    "enrollmentId" INTEGER,

    CONSTRAINT "TermSubjectGroupSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubjectToSubjectGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TermSubjectGroupSubject_termId_subjectGroupId_subjectId_key" ON "TermSubjectGroupSubject"("termId", "subjectGroupId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToSubjectGroup_AB_unique" ON "_SubjectToSubjectGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToSubjectGroup_B_index" ON "_SubjectToSubjectGroup"("B");

-- AddForeignKey
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_subjectGroupId_fkey" FOREIGN KEY ("subjectGroupId") REFERENCES "SubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToSubjectGroup" ADD CONSTRAINT "_SubjectToSubjectGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToSubjectGroup" ADD CONSTRAINT "_SubjectToSubjectGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "SubjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
