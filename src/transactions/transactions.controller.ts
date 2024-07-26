import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: any, @Query() filters?: any ) {
    const user = req.user;
    const transactions = await this.transactionsService.findAll(filters, user);
    return transactions;
  }

  @Post()
  async create(@Body() newTransaction: CreateTransactionsDto) {
    const transaction = await this.transactionsService.create(newTransaction);
    return transaction;
  }
}
