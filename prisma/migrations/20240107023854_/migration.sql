-- DropForeignKey
ALTER TABLE "TeacherEmergencyContact" DROP CONSTRAINT "TeacherEmergencyContact_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "TeacherEmergencyContact" ADD CONSTRAINT "TeacherEmergencyContact_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
