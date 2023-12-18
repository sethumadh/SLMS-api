-- CreateTable
CREATE TABLE "TimeTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("id")
);
