import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AccountService } from './accountService';

const prisma = new PrismaClient()

@Injectable()
export class TransactionService {

  async transferValue(body) {
    var withdrawalAccount = await AccountService.withdrawalValueFromAccount(body.senderAccountId, body.value)
    if((await withdrawalAccount).withdrawalValue != null) {
        var depositAccount = await AccountService.depositValueFromAccount(body.receiverAccountId, body.value)
        if((await depositAccount).depositValue != null ) {
            const newAccount = await prisma.transaction.create({
                data: {
                    "type" : "TRANSFER",
                    receiverAccountId : +body.receiverAccountId,
                    value : +body.value,
                    senderAccountId: body.senderAccountId
                }
            })
            return newAccount != null ? { response: "Transaction Created Successfully" } : { error: "Error creating transaction. Try again later!" }
        } else {
            return { error: depositAccount.error }
        }
    } else {
        return { error: withdrawalAccount.error }
    }
  }

  async withdrawalValue(body) {
    var withdrawalAccount = await AccountService.withdrawalValueFromAccount(body.accountId, body.value)
    if((await withdrawalAccount).withdrawalValue != null) {
        const newAccount = await prisma.transaction.create({
            data: {
                receiverAccountId : +body.accountId,
                value : +body.value,
                type : "WITHDRAWAL",
                senderAccountId: -1
            }
        })
        return newAccount != null ? { response: "Withdrawal Completed!" } : { error: "Error. Try again later!" }
    } else {
        return { error: withdrawalAccount.error }
    }
  }

  async depositValue(body) {
    var depositAccount = await AccountService.depositValueFromAccount(body.accountId, body.value)
    if((await depositAccount).depositValue != null) {
        const newAccount = await prisma.transaction.create({
            data: {
                receiverAccountId : +body.accountId,
                value : +body.value,
                type : "DEPOSIT",
                senderAccountId: -1
            }
        })
        return newAccount != null ? { response: "Deposit Completed!" } : { error: "Error. Try again later!" }
    } else {
        return { error: depositAccount.error }
    }
  }

  static async getTransactions(accountId) {
    const transactionList = await prisma.transaction.findMany({
        where: {
          OR: [
            {
                senderAccountId: {
                    equals: +accountId
                }
            },
            {
                receiverAccountId: {
                    equals: +accountId
                }
            }
          ]
        },
        select: {
            type: true,
            value: true,
            date: true
        }
      })
    return transactionList ? transactionList : { error : "error searching transaction"}
  }
}
