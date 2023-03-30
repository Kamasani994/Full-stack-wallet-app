import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(walletId: string, createTransactionDto: CreateTransactionDto): Promise<{
        balance: number;
        transactionId: string;
    }>;
    fetchTransactions(pageOptionsDto: PageOptionsDto): Promise<{
        list: import("./transaction.entity").Transaction[];
        count: number;
    }>;
}
