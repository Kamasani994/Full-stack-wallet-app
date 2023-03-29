import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Transaction,
  TransactionType,
} from '../transaction/transaction.entity';
import { SetupResponseDto } from './dto/setup-response-dto';
import { SetupWalletDto } from './dto/setup-wallet.dto';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async setupWallet(setupWalletDto: SetupWalletDto) {
    const { name, balance } = setupWalletDto;
    const wallet = await this.walletRepository.save({ name, balance });
    const transaction = await this.transactionRepository.save({
      wallet: wallet,
      type: TransactionType.CREDIT,
      amount: wallet.balance,
      balance: wallet.balance,
      description: 'Initial setup',
    });

    return new SetupResponseDto(
      wallet.id,
      wallet.balance,
      transaction.id,
      wallet.name,
    );
  }

  async getWalletData(id: string) {
    return this.walletRepository.findOne({ where: { id } });
  }
}
