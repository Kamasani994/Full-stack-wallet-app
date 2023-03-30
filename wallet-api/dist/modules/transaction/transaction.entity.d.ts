import { Wallet } from '../wallet/wallet.entity';
export declare enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}
export declare class Transaction {
    id: string;
    wallet: Wallet;
    type: TransactionType;
    amount: number;
    balance: number;
    description: string;
    date: Date;
}
