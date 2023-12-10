-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "sectionId" INTEGER,
ADD COLUMN     "termSubjectLevelId" INTEGER;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermSubjectLevel" (
    "id" SERIAL NOT NULL,
    "termId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "TermSubjectLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentClassHistory" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "termSubjectLevelId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "changeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "StudentClassHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SectionToTermSubjectLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubjectLevel_termId_subjectId_levelId_key" ON "TermSubjectLevel"("termId", "subjectId", "levelId");

-- CreateIndex
CREATE UNIQUE INDEX "_SectionToTermSubjectLevel_AB_unique" ON "_SectionToTermSubjectLevel"("A", "B");

-- CreateIndex
CREATE INDEX "_SectionToTermSubjectLevel_B_index" ON "_SectionToTermSubjectLevel"("B");

-- AddForeignKey
ALTER TABLE "TermSubjectLevel" ADD CONSTRAINT "TermSubjectLevel_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectLevel" ADD CONSTRAINT "TermSubjectLevel_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectLevel" ADD CONSTRAINT "TermSubjectLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassHistory" ADD CONSTRAINT "StudentClassHistory_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_termSubjectLevelId_fkey" FOREIGN KEY ("termSubjectLevelId") REFERENCES "TermSubjectLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTermSubjectLevel" ADD CONSTRAINT "_SectionToTermSubjectLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTermSubjectLevel" ADD CONSTRAINT "_SectionToTermSubjectLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "TermSubjectLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
