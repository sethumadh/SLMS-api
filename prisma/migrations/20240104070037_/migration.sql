/*
  Warnings:

  - You are about to drop the `TeacherHealthInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherHealthInformation" DROP CONSTRAINT "TeacherHealthInformation_teacherId_fkey";

-- DropTable
DROP TABLE "TeacherHealthInformation";

-- CreateTable
CREATE TABLE "TeacherWWCHealthInformation" (
    "id" SERIAL NOT NULL,
    "medicareNumber" TEXT DEFAULT 'Medicare Number not provided',
    "medicalCondition" TEXT NOT NULL,
    "childrenCheckCardNumber" TEXT NOT NULL,
    "workingWithChildrenCheckExpiry" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeacherWWCHealthInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherWWCHealthInformation_childrenCheckCardNumber_key" ON "TeacherWWCHealthInformation"("childrenCheckCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherWWCHealthInformation_teacherId_key" ON "TeacherWWCHealthInformation"("teacherId");

-- AddForeignKey
ALTER TABLE "TeacherWWCHealthInformation" ADD CONSTRAINT "TeacherWWCHealthInformation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
