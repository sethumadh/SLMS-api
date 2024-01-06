/*
  Warnings:

  - A unique constraint covering the columns `[childrenCheckCardNumber]` on the table `TeacherHealthInformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `TeacherPersonalDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `TeacherPersonalDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeacherHealthInformation_childrenCheckCardNumber_key" ON "TeacherHealthInformation"("childrenCheckCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherPersonalDetails_email_key" ON "TeacherPersonalDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherPersonalDetails_contact_key" ON "TeacherPersonalDetails"("contact");
