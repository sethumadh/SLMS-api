/*
  Warnings:

  - You are about to drop the column `sectionId` on the `StudentClassHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,termSubjectLevelId,isCurrentlyAssigned]` on the table `StudentClassHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StudentClassHistory" DROP COLUMN "sectionId",
ADD COLUMN     "isCurrentlyAssigned" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "StudentClassHistory_studentId_termSubjectLevelId_isCurrentl_key" ON "StudentClassHistory"("studentId", "termSubjectLevelId", "isCurrentlyAssigned");

-- AddForeignKey
ALTER TABLE "StudentClassHistory" ADD CONSTRAINT "StudentClassHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassHistory" ADD CONSTRAINT "StudentClassHistory_termSubjectLevelId_fkey" FOREIGN KEY ("termSubjectLevelId") REFERENCES "TermSubjectLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
