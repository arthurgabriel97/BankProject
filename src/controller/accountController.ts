import { Controller, Get, Post } from '@nestjs/common';
import { AccountService } from 'src/service/accountService';

@Controller('account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post('create')
  createAccount(): string {
    return this.appService.createAccount();
  }

  @Get('account-balance')
  getAccountBalance(): string {
    return this.appService.getAccountBalance();
  }

  @Get('account-statement')
  getAccountStatement(): string {
    return this.appService.getAccountStatement();
  }
}
