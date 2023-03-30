import { SetupWalletDto } from './dto/setup-wallet.dto';
import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    setup(setupWalletDto: SetupWalletDto): Promise<import("./dto/setup-response-dto").SetupResponseDto>;
    getWallet(id: string): Promise<import("./wallet.entity").Wallet>;
}
