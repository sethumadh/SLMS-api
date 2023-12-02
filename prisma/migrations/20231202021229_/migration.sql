-- DropForeignKey
ALTER TABLE "TermSubject" DROP CONSTRAINT "TermSubject_termSubjectGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TermSubjectGroupSubject" DROP CONSTRAINT "TermSubjectGroupSubject_termId_fkey";

-- DropForeignKey
ALTER TABLE "TermSubjectGroupSubject" DROP CONSTRAINT "TermSubjectGroupSubject_termSubjectGroupId_fkey";

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
