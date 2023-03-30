import { Repository } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { SetupResponseDto } from './dto/setup-response-dto';
import { SetupWalletDto } from './dto/setup-wallet.dto';
import { Wallet } from './wallet.entity';
export declare class WalletService {
    private readonly walletRepository;
    private readonly transactionRepository;
    constructor(walletRepository: Repository<Wallet>, transactionRepository: Repository<Transaction>);
    setupWallet(setupWalletDto: SetupWalletDto): Promise<SetupResponseDto>;
    getWalletData(id: string): Promise<Wallet>;
}
