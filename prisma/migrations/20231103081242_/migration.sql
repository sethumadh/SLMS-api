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
CREATE TABLE "Subjects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectsList" (
    "id" SERIAL NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectsId" INTEGER,

    CONSTRAINT "SubjectsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectRelatedList" (
    "id" SERIAL NOT NULL,
    "subjectRelated" TEXT NOT NULL,
    "subjectsId" INTEGER,

    CONSTRAINT "SubjectRelatedList_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "feedback" TEXT[],
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_email_key" ON "PersonalDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_contact_key" ON "PersonalDetails"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_studentId_key" ON "PersonalDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ParentsDetails_studentId_key" ON "ParentsDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_studentId_key" ON "EmergencyContact"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInformation_medicareNumber_key" ON "HealthInformation"("medicareNumber");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInformation_studentId_key" ON "HealthInformation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_userId_key" ON "Subjects"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OtherInformation_studentId_key" ON "OtherInformation"("studentId");

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentsDetails" ADD CONSTRAINT "ParentsDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInformation" ADD CONSTRAINT "HealthInformation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectsList" ADD CONSTRAINT "SubjectsList_subjectsId_fkey" FOREIGN KEY ("subjectsId") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectRelatedList" ADD CONSTRAINT "SubjectRelatedList_subjectsId_fkey" FOREIGN KEY ("subjectsId") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherInformation" ADD CONSTRAINT "OtherInformation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
