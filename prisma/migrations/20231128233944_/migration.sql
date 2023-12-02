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
    "subjectsChosen" TEXT[],
    "subjectRelated" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalDetails" (
    "id" SERIAL NOT NULL,
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
CREATE TABLE "TermSubject" (
    "id" SERIAL NOT NULL,
    "termId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "feeId" INTEGER,

    CONSTRAINT "TermSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "termSubjectId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "termSubjectTermId" INTEGER,
    "termSubjectSubjectId" INTEGER,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "isGroupFee" BOOLEAN NOT NULL,
    "paymentType" "PaymentType" NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeePayment" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "amount" INTEGER NOT NULL,
    "dueAmount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'NODUES',
    "method" "PaymentMethod" NOT NULL DEFAULT 'NA',

    CONSTRAINT "FeePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LevelToTermSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_studentId_key" ON "PersonalDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_firstName_lastName_DOB_email_key" ON "PersonalDetails"("firstName", "lastName", "DOB", "email");

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
CREATE UNIQUE INDEX "Term_name_key" ON "Term"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TermSubject_termId_subjectId_key" ON "TermSubject"("termId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_termSubjectId_key" ON "Enrollment"("studentId", "termSubjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Fee_amount_paymentType_key" ON "Fee"("amount", "paymentType");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToTermSubject_AB_unique" ON "_LevelToTermSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToTermSubject_B_index" ON "_LevelToTermSubject"("B");

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
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermSubject" ADD CONSTRAINT "TermSubject_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_termSubjectTermId_termSubjectSubjectId_fkey" FOREIGN KEY ("termSubjectTermId", "termSubjectSubjectId") REFERENCES "TermSubject"("termId", "subjectId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToTermSubject" ADD CONSTRAINT "_LevelToTermSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToTermSubject" ADD CONSTRAINT "_LevelToTermSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "TermSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
