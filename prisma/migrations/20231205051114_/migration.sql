/*
  Warnings:

  - The `attendance` column on the `SubjectEnrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `grade` on table `SubjectEnrollment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SubjectEnrollment" ALTER COLUMN "grade" SET NOT NULL,
ALTER COLUMN "grade" SET DEFAULT 'No Grades yet',
DROP COLUMN "attendance",
ADD COLUMN     "attendance" BOOLEAN[];
