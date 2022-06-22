import { Controller, Get, Post, Req, Query } from '@nestjs/common';
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
  getAccountBalance(@Query() query) {
    return this.appService.getAccountBalance(query.accountId);
  }

  @Get('account-statement')
  getAccountStatement(@Query() query) {
    return this.appService.getAccountStatement(query.accountId);
  }
}
