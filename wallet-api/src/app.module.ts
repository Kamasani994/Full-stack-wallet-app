import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './modules/wallet/wallet.module';
import { Wallet } from './modules/wallet/wallet.entity';
import { Transaction } from './modules/transaction/transaction.entity';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password1',
      database: 'wallet',
      entities: [Wallet, Transaction],
      synchronize: true,
    }),
    WalletModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
