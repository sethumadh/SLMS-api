/*
  Warnings:

  - You are about to drop the column `WorkingwithChildrenCheckCardImage` on the `TeacherWWCHealthInformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeacherWWCHealthInformation" DROP COLUMN "WorkingwithChildrenCheckCardImage",
ADD COLUMN     "WorkingwithChildrenCheckCardPhotoImage" TEXT;

-- AlterTable
ALTER TABLE "TeacherWorkRights" ALTER COLUMN "immigrationStatus" SET DATA TYPE TEXT;
