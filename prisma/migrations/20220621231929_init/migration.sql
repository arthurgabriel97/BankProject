/*
  Warnings:

  - You are about to drop the column `status` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "status",
ALTER COLUMN "senderAccountId" DROP NOT NULL;
