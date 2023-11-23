-- DropForeignKey
ALTER TABLE "TermSubject" DROP CONSTRAINT "TermSubject_termId_fkey";

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
