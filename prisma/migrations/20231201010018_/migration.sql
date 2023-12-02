-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "termSubjectGroupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
