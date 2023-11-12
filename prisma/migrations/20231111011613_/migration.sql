-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'ALUMNI');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalDetails" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "DOB" TEXT,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "image" TEXT,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentsDetails" (
    "id" SERIAL NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "parentEmail" TEXT NOT NULL,
    "parentContact" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "ParentsDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" SERIAL NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthInformation" (
    "id" SERIAL NOT NULL,
    "medicareNumber" TEXT NOT NULL,
    "ambulanceMembershipNumber" TEXT,
    "medicalCondition" TEXT NOT NULL,
    "allergy" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "HealthInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherInformation" (
    "id" SERIAL NOT NULL,
    "otherInfo" TEXT NOT NULL DEFAULT 'No information provided',
    "declaration" TEXT[],
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "OtherInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "currentTerm" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "feedback" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LevelToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_email_key" ON "PersonalDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_contact_key" ON "PersonalDetails"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_studentId_key" ON "PersonalDetails"("studentId");

-- CreateIndex
CREATE INDEX "PersonalDetails_email_idx" ON "PersonalDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ParentsDetails_studentId_key" ON "ParentsDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_studentId_key" ON "EmergencyContact"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInformation_medicareNumber_key" ON "HealthInformation"("medicareNumber");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInformation_studentId_key" ON "HealthInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "OtherInformation_studentId_key" ON "OtherInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Term_name_key" ON "Term"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_termId_key" ON "Enrollment"("termId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_subjectId_levelId_termId_key" ON "Enrollment"("studentId", "subjectId", "levelId", "termId");

-- CreateIndex
CREATE UNIQUE INDEX "Fee_enrollmentId_key" ON "Fee"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Fee_subjectId_key" ON "Fee"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToSubject_AB_unique" ON "_LevelToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToSubject_B_index" ON "_LevelToSubject"("B");

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentsDetails" ADD CONSTRAINT "ParentsDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInformation" ADD CONSTRAINT "HealthInformation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherInformation" ADD CONSTRAINT "OtherInformation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToSubject" ADD CONSTRAINT "_LevelToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToSubject" ADD CONSTRAINT "_LevelToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;