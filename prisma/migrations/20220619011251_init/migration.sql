-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "senderAccountId" INTEGER NOT NULL,
    "receiverAccountId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_CPF_key" ON "account"("CPF");
