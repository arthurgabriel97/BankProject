import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class AccountService {

  async createAccount(accountData) {
    const newAccount = await prisma.account.create({
        data: {
            ...accountData
        }
    })
    return newAccount != null ? { response: "Account Created Successfully" } : { error: "Error creating account. Try again later!" }
  }

  async getAccountBalance(accountId) {
    const accountBalance = AccountService.getBalance(accountId)
    return accountBalance != null ? { accountId:+accountId, accountBalance: +accountBalance } : { error:"This account does not exist!" }

  }

  static async getBalance(accountId) {
    const account = await prisma.account.findUnique({
      where: {
          id : +accountId
      }
    })
    return +account.balance != null ? +account.balance : -1
  }

  static async withdrawalValueFromAccount(accountId, value) {
    const withdrawalAccountBalance = await AccountService.getBalance(accountId)
    if(+withdrawalAccountBalance >= value) {
      const updateValue = {
        balance : +withdrawalAccountBalance - value
      }
      const withdrawalValue = await prisma.account.update({
        where: {
          id : accountId
        },
        data: {
          ...updateValue
        }
      })
      console.log(withdrawalValue)
      return { withdrawalValue: withdrawalValue}
    } else {
      return { withdrawalValue : null, error: "This account does not have the necessary value."}
    }
  }

  static async depositValueFromAccount(accountId, value) {
    const depositAccountBalance = await AccountService.getBalance(accountId)
    const updateValue = {
      balance : depositAccountBalance + value
    }
    const depositValue = await prisma.account.update({
      where: {
        id : accountId
      },
      data: {
        ...updateValue
      }
    })
    return depositValue ? { depositValue :depositValue } : { error: "Error depositing value"}
  }
}
