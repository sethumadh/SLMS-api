-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "feedback" SET NOT NULL,
ALTER COLUMN "feedback" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "PersonalDetails_email_idx" ON "PersonalDetails"("email");
