import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async findAll(filters?: any, user?: User): Promise<Transaction[]> {
    if (filters.myCollections) {
      return this.transactionsRepository.find({
        where: [{ seller: { id: user.id } }, { buyer: { id: user.id } }],
      });
    }
    return this.transactionsRepository.find();
  }

  async create(newTransaction: CreateTransactionsDto): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(newTransaction);
    await this.transactionsRepository.save(transaction);
    return transaction;
  }
}
