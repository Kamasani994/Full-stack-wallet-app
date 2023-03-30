import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { Transaction, TransactionType } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, walletId: string) {
    try {
      const { amount, description } = createTransactionDto;
      const transactionType =
        amount > 0 ? TransactionType.CREDIT : TransactionType.DEBIT;
      const wallet = await this.walletRepository.findOne({
        where: { id: walletId },
      });

      if (transactionType === TransactionType.DEBIT) {
        if (Math.abs(amount) > wallet.balance) {
          throw new HttpException(
            'Insufficient balance',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      // can use transactions conecpt to rollback if something fails
      await this.walletRepository.update(
        { id: walletId },
        { balance: wallet.balance + amount },
      );
      const { balance, id } = await this.transactionRepository.save({
        balance: wallet.balance + amount,
        amount: amount,
        description: description,
        type: transactionType,
        wallet: wallet,
      });

      return {
        balance: Number(balance.toFixed(4)),
        transactionId: id,
      };
    } catch (err) {
      throw err;
    }
  }

  async fetchAllTransactions(pageOptionsDto: PageOptionsDto) {
    const { walletId, skip, limit } = pageOptionsDto;

    try {
      const [list, count] = await this.transactionRepository.findAndCount({
        where: { wallet: { id: walletId } },
        select: ['id', 'amount', 'type', 'balance', 'date'],
        order: { date: 'DESC' },
        skip: skip,
        take: limit,
      });
      return { list, count };
    } catch (err) {
      throw new HttpException(
        'Something went wrong. Please try again after sometime',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
