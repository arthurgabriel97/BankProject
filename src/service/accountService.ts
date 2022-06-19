import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class AccountService {

  async createAccount(body) {
    const newAccount = await prisma.account.create({
        data: {
            ...body
        }
    })
    return newAccount != null ? { response: "Account Created Successfully" } : { error: "Error creating account. Try again later!" }
  }

  async getAccountBalance(accountId) {
    const account = await prisma.account.findUnique({
        where: {
            id : +accountId
        }
    })
    return account != null ? { accountId:+accountId, accountBalance: +account.balance } : { error:"This account does not exist!" }
  }

  getAccountStatement(): string {
    return 'Extrato da conta';
  }
}
