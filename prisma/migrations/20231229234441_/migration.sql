-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'APPLICANT', 'WAITLISTED', 'STUDENT', 'ALUMNI');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ONLINE', 'SCHOOL', 'NA', 'DISCOUNT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'NODUES');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('MONTHLY', 'TERM');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'APPLICANT',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "subjectsChosen" TEXT[],
    "subjectRelated" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "image" TEXT,

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
    "medicareNumber" TEXT DEFAULT 'Medicare Number not provided',
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
CREATE TABLE "SubjectGroup" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "SubjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    "currentTerm" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "TermSubject" (
    "id" SERIAL NOT NULL,
    "termSubjectGroupId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "TermSubject_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "termSubjectGroupId" INTEGER NOT NULL,
    "subjectEnrollmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionId" INTEGER,
    "termSubjectLevelId" INTEGER,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectEnrollment" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "termSubjectId" INTEGER NOT NULL,
    "grade" TEXT NOT NULL DEFAULT 'No Grades yet',
    "attendance" BOOLEAN[],

    CONSTRAINT "SubjectEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentType" "PaymentType" NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTermFee" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "termSubjectGroupId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "StudentTermFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeePayment" (
    "id" SERIAL NOT NULL,
    "feeId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "amount" INTEGER NOT NULL,
    "dueAmount" INTEGER NOT NULL,
    "studentTermFeeId" INTEGER,
    "status" "PaymentStatus" NOT NULL DEFAULT 'NODUES',
    "method" "PaymentMethod" NOT NULL DEFAULT 'NA',

    CONSTRAINT "FeePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermSubjectGroupSubject" (
    "id" SERIAL NOT NULL,
    "termId" INTEGER NOT NULL,
    "subjectGroupId" INTEGER NOT NULL,
    "termSubjectGroupId" INTEGER,
    "enrollmentId" INTEGER,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "TermSubjectGroupSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT 'Timetable',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubjectToTermSubjectGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LevelToTermSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SectionToTermSubjectLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_studentId_key" ON "PersonalDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ParentsDetails_studentId_key" ON "ParentsDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_studentId_key" ON "EmergencyContact"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInformation_studentId_key" ON "HealthInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "OtherInformation_studentId_key" ON "OtherInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectGroup_groupName_key" ON "SubjectGroup"("groupName");

-- CreateIndex
CREATE UNIQUE INDEX "Term_name_key" ON "Term"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubjectGroup_termId_subjectGroupId_key" ON "TermSubjectGroup"("termId", "subjectGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubject_termId_subjectId_termSubjectGroupId_key" ON "TermSubject"("termId", "subjectId", "termSubjectGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubjectLevel_termId_subjectId_levelId_key" ON "TermSubjectLevel"("termId", "subjectId", "levelId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_subjectEnrollmentId_key" ON "Enrollment"("subjectEnrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_termSubjectGroupId_subjectEnrollmentId_key" ON "Enrollment"("studentId", "termSubjectGroupId", "subjectEnrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectEnrollment_enrollmentId_key" ON "SubjectEnrollment"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectEnrollment_enrollmentId_termSubjectId_key" ON "SubjectEnrollment"("enrollmentId", "termSubjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Fee_amount_paymentType_key" ON "Fee"("amount", "paymentType");

-- CreateIndex
CREATE UNIQUE INDEX "StudentTermFee_studentId_termSubjectGroupId_termId_key" ON "StudentTermFee"("studentId", "termSubjectGroupId", "termId");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubjectGroupSubject_termId_subjectGroupId_subjectId_key" ON "TermSubjectGroupSubject"("termId", "subjectGroupId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTermSubjectGroup_AB_unique" ON "_SubjectToTermSubjectGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTermSubjectGroup_B_index" ON "_SubjectToTermSubjectGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToTermSubject_AB_unique" ON "_LevelToTermSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToTermSubject_B_index" ON "_LevelToTermSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SectionToTermSubjectLevel_AB_unique" ON "_SectionToTermSubjectLevel"("A", "B");

-- CreateIndex
CREATE INDEX "_SectionToTermSubjectLevel_B_index" ON "_SectionToTermSubjectLevel"("B");

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
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroup" ADD CONSTRAINT "TermSubjectGroup_subjectGroupId_fkey" FOREIGN KEY ("subjectGroupId") REFERENCES "SubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectLevel" ADD CONSTRAINT "TermSubjectLevel_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectLevel" ADD CONSTRAINT "TermSubjectLevel_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectLevel" ADD CONSTRAINT "TermSubjectLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassHistory" ADD CONSTRAINT "StudentClassHistory_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_termSubjectLevelId_fkey" FOREIGN KEY ("termSubjectLevelId") REFERENCES "TermSubjectLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_termSubjectId_fkey" FOREIGN KEY ("termSubjectId") REFERENCES "TermSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermFee" ADD CONSTRAINT "StudentTermFee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermFee" ADD CONSTRAINT "StudentTermFee_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermFee" ADD CONSTRAINT "StudentTermFee_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_studentTermFeeId_fkey" FOREIGN KEY ("studentTermFeeId") REFERENCES "StudentTermFee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_subjectGroupId_fkey" FOREIGN KEY ("subjectGroupId") REFERENCES "SubjectGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_termSubjectGroupId_fkey" FOREIGN KEY ("termSubjectGroupId") REFERENCES "TermSubjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubjectGroupSubject" ADD CONSTRAINT "TermSubjectGroupSubject_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTermSubjectGroup" ADD CONSTRAINT "_SubjectToTermSubjectGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTermSubjectGroup" ADD CONSTRAINT "_SubjectToTermSubjectGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TermSubjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToTermSubject" ADD CONSTRAINT "_LevelToTermSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToTermSubject" ADD CONSTRAINT "_LevelToTermSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "TermSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTermSubjectLevel" ADD CONSTRAINT "_SectionToTermSubjectLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTermSubjectLevel" ADD CONSTRAINT "_SectionToTermSubjectLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "TermSubjectLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
