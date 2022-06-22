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
  withdrawalValue(@Req() request: Request) {
    return this.appService.withdrawalValue(request.body);
  }

  @Post('deposit')
  depositValue(@Req() request: Request) {
    return this.appService.depositValue(request.body);
  }

}
