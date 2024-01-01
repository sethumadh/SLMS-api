/*
  Warnings:

  - You are about to drop the column `amount` on the `FeePayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FeePayment" DROP COLUMN "amount",
ADD COLUMN     "amountPaid" INTEGER NOT NULL DEFAULT 0;
