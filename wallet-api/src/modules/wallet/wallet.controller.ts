import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SetupWalletDto } from './dto/setup-wallet.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post('/setup')
  async setup(@Body() setupWalletDto: SetupWalletDto) {
    return await this.walletService.setupWallet(setupWalletDto);
  }

  @Get('/:id')
  async getWallet(@Param('id') id: string) {
    return await this.walletService.getWalletData(id);
  }
}
