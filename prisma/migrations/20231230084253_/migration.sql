-- DropForeignKey
ALTER TABLE "FeePayment" DROP CONSTRAINT "FeePayment_studentTermFeeId_fkey";

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_studentTermFeeId_fkey" FOREIGN KEY ("studentTermFeeId") REFERENCES "StudentTermFee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
