import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { TransactionService } from './transaction.service';

@Controller('')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post('/transact/:walletId')
  async create(
    @Param('walletId') walletId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return await this.transactionService.create(createTransactionDto, walletId);
  }

  @Get('/transactions')
  async fetchTransactions(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.transactionService.fetchAllTransactions(pageOptionsDto);
  }
}
