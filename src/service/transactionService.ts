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
                    ...body
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

  async withdrawalValue(accountId) {
    const account = await prisma.account.findUnique({
        where: {
            id : +accountId
        }
    })
    return account != null ? { accountId:+accountId, accountBalance: +account.balance } : { error:"This account does not exist!" }
  }

  async getAccountStatement() {
    
  }
}
