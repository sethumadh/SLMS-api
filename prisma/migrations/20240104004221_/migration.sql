-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "isAllowedLogin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAllowedLogin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TeacherPersonalDetails" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
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

    CONSTRAINT "TeacherPersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherEmergencyContact" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,

    CONSTRAINT "TeacherEmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherHealthInformation" (
    "id" SERIAL NOT NULL,
    "medicareNumber" TEXT DEFAULT 'Medicare Number not provided',
    "medicalCondition" TEXT NOT NULL,
    "childrenCheckCardNumber" TEXT NOT NULL,
    "workingWithChildrenCheckExpiry" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherHealthInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherWorkRights" (
    "id" SERIAL NOT NULL,
    "workRights" BOOLEAN NOT NULL,
    "immigrationStatus" BOOLEAN NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherWorkRights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherQualificationAvailability" (
    "id" SERIAL NOT NULL,
    "qualification" TEXT NOT NULL,
    "subjectsChosen" TEXT[],
    "timeSlotsChosen" TEXT[],
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherQualificationAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherBankDetailss" (
    "id" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "BSB" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ABN" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherBankDetailss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherOtherInformation" (
    "id" SERIAL NOT NULL,
    "otherInfo" TEXT NOT NULL DEFAULT 'No information provided',
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherOtherInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherSubject" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "TeacherSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherPersonalDetails_teacherId_key" ON "TeacherPersonalDetails"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherEmergencyContact_teacherId_key" ON "TeacherEmergencyContact"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherHealthInformation_teacherId_key" ON "TeacherHealthInformation"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherWorkRights_teacherId_key" ON "TeacherWorkRights"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherQualificationAvailability_teacherId_key" ON "TeacherQualificationAvailability"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherBankDetailss_teacherId_key" ON "TeacherBankDetailss"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherOtherInformation_teacherId_key" ON "TeacherOtherInformation"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSubject_teacherId_subjectId_key" ON "TeacherSubject"("teacherId", "subjectId");

-- AddForeignKey
ALTER TABLE "TeacherPersonalDetails" ADD CONSTRAINT "TeacherPersonalDetails_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherEmergencyContact" ADD CONSTRAINT "TeacherEmergencyContact_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherHealthInformation" ADD CONSTRAINT "TeacherHealthInformation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherWorkRights" ADD CONSTRAINT "TeacherWorkRights_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherQualificationAvailability" ADD CONSTRAINT "TeacherQualificationAvailability_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherBankDetailss" ADD CONSTRAINT "TeacherBankDetailss_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOtherInformation" ADD CONSTRAINT "TeacherOtherInformation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
