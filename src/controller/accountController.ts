import { Controller, Get, Post, Req } from '@nestjs/common';
import { AccountService } from 'src/service/accountService';
import { Request } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post('create')
  createAccount(@Req() request: Request) {
    return this.appService.createAccount(request.body);
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
