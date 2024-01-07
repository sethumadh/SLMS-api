-- DropForeignKey
ALTER TABLE "TeacherBankDetails" DROP CONSTRAINT "TeacherBankDetails_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherOtherInformation" DROP CONSTRAINT "TeacherOtherInformation_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherQualificationAvailability" DROP CONSTRAINT "TeacherQualificationAvailability_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherWWCHealthInformation" DROP CONSTRAINT "TeacherWWCHealthInformation_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherWorkRights" DROP CONSTRAINT "TeacherWorkRights_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "TeacherWWCHealthInformation" ADD CONSTRAINT "TeacherWWCHealthInformation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherWorkRights" ADD CONSTRAINT "TeacherWorkRights_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherQualificationAvailability" ADD CONSTRAINT "TeacherQualificationAvailability_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherBankDetails" ADD CONSTRAINT "TeacherBankDetails_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOtherInformation" ADD CONSTRAINT "TeacherOtherInformation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
