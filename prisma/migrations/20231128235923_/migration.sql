-- AlterTable
ALTER TABLE "Fee" ADD COLUMN     "groupName" TEXT NOT NULL DEFAULT 'NA',
ALTER COLUMN "isGroupFee" SET DEFAULT false;
