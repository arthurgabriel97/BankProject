import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {

  createAccount(): string {
    return "Conta criada com sucesso"
  }
  getAccountBalance(): string {
    return 'Hello world!';
  }
  getAccountStatement(): string {
    return 'Olá mundo!';
  }
}
