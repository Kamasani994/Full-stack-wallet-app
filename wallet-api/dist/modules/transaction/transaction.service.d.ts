import { Repository } from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { Transaction } from './transaction.entity';
export declare class TransactionService {
    private readonly transactionRepository;
    private readonly walletRepository;
    constructor(transactionRepository: Repository<Transaction>, walletRepository: Repository<Wallet>);
    create(createTransactionDto: CreateTransactionDto, walletId: string): Promise<{
        balance: number;
        transactionId: string;
    }>;
    fetchAllTransactions(pageOptionsDto: PageOptionsDto): Promise<Transaction[]>;
}
