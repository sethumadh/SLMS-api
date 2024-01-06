/*
  Warnings:

  - You are about to drop the column `image` on the `TeacherWWCHealthInformation` table. All the data in the column will be lost.
  - Added the required column `experience` to the `TeacherQualificationAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeacherQualificationAvailability" ADD COLUMN     "experience" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeacherWWCHealthInformation" DROP COLUMN "image",
ADD COLUMN     "WorkingwithChildrenCheckCardImage" TEXT;
