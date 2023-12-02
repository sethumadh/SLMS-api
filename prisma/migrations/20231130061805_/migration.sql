/*
  Warnings:

  - You are about to drop the column `termSubjectId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `termSubjectSubjectId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `termSubjectTermId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `isGroupFee` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `termId` on the `TermSubject` table. All the data in the column will be lost.
  - You are about to drop the `_LevelToTermSubject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,termSubjectGroupId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `termSubjectGroupId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `TermSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termSubjectGroupId` to the `TermSubject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_termSubjectTermId_termSubjectSubjectId_fkey";

-- DropForeignKey
ALTER TABLE "TermSubject" DROP CONSTRAINT "TermSubject_termId_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToTermSubject" DROP CONSTRAINT "_LevelToTermSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToTermSubject" DROP CONSTRAINT "_LevelToTermSubject_B_fkey";

-- DropIndex
DROP INDEX "Enrollment_studentId_termSubjectId_key";

-- DropIndex
DROP INDEX "TermSubject_termId_subjectId_key";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "termSubjectId",
DROP COLUMN "termSubjectSubjectId",
DROP COLUMN "termSubjectTermId",
ADD COLUMN     "termSubjectGroupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Fee" DROP COLUMN "groupName",
DROP COLUMN "isGroupFee";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subjectGroupId" INTEGER;

-- AlterTable
ALTER TABLE "TermSubject" DROP COLUMN "termId",
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD COLUMN     "termSubjectGroupId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_LevelToTermSubject";

-- CreateTable
CREATE TABLE "SubjectGroup" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "SubjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermSubjectGroup" (
    "id" SERIAL NOT NULL,
    "termId" INTEGER NOT NULL,
    "feeId" INTEGER,
    "subjectGroupId" INTEGER NOT NULL,

    CONSTRAINT "TermSubjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LevelToTermSubjectGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectGroup_groupName_key" ON "SubjectGroup"("groupName");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubjectGroup_termId_subjectGroupId_key" ON "TermSubjectGroup"("termId", "subjectGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToTermSubjectGroup_AB_unique" ON "_LevelToTermSubjectGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToTermSubjectGroup_B_index" ON "_LevelToTermSubjectGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_termSubjectGroupId_key" ON "Enrollment"("studentId", "termSubjectGroupId");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_subjectGroupId_fkey" FOREIGN KEY ("subjectGroupId") REFERENCES "SubjectGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_subjectGroupId_fkey" FOREIGN KEY ("subjectGroupId") REFERENCES "SubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToTermSubjectGroup" ADD CONSTRAINT "_LevelToTermSubjectGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToTermSubjectGroup" ADD CONSTRAINT "_LevelToTermSubjectGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TermSubjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
