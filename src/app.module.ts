import { Module } from '@nestjs/common';
import { AccountController } from './controller/accountController';
import { AccountService } from './service/accountService';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
