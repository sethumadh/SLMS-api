/*
  Warnings:

  - You are about to drop the column `WorkingwithChildrenCheckCardPhotoImage` on the `TeacherWWCHealthInformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeacherWWCHealthInformation" DROP COLUMN "WorkingwithChildrenCheckCardPhotoImage",
ADD COLUMN     "workingwithChildrenCheckCardPhotoImage" TEXT;
