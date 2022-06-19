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
    return {response: "Account Created Successfully"}
  }
  getAccountBalance(): string {
    return 'Hello world!';
  }
  getAccountStatement(): string {
    return 'Olá mundo!';
  }
}
