/*
  Warnings:

  - A unique constraint covering the columns `[studentId,termSubjectLevelId,isCurrentlyAssigned,sectionId]` on the table `StudentClassHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StudentClassHistory_studentId_termSubjectLevelId_isCurrentl_key";

-- CreateIndex
CREATE UNIQUE INDEX "StudentClassHistory_studentId_termSubjectLevelId_isCurrentl_key" ON "StudentClassHistory"("studentId", "termSubjectLevelId", "isCurrentlyAssigned", "sectionId");
