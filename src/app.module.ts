import { Module } from '@nestjs/common';
import { AccountController } from './controller/accountController';
import { AccountService } from './service/accountService';
import { TransactionController } from './controller/transactionController';
import { TransactionService } from './service/transactionService';

@Module({
  imports: [],
  controllers: [AccountController, TransactionController],
  providers: [AccountService, TransactionService],
})
export class AppModule {}
