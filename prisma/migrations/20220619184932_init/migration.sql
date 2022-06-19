/*
  Warnings:

  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "transactions";

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "senderAccountId" INTEGER NOT NULL,
    "receiverAccountId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
