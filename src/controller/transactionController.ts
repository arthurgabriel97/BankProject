import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { TransactionService } from 'src/service/transactionService';
import { Request } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly appService: TransactionService) {}

  @Post('transfer')
  transferValue(@Req() request: Request) {
    return this.appService.transferValue(request.body);
  }

  @Post('withdrawal')
  withdrawalValue(@Query() query) {
    return this.appService.withdrawalValue(query.accountId);
  }

  @Get('account-statement')
  getAccountStatement() {
    return this.appService.getAccountStatement();
  }
}
