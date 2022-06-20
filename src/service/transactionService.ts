import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class TransactionService {

  async transferValue(body) {
    const newAccount = await prisma.account.create({
        data: {
            ...body
        }
    })
    return newAccount != null ? { response: "Account Created Successfully" } : { error: "Error creating account. Try again later!" }
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
