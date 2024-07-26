import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@/users/users.service';

@Injectable()
export class WalletService {
  constructor(
  // private readonly collectionsService: CollectionsService,
  private readonly usersService: UsersService,
  @InjectRepository(Wallet) private walletRepository: Repository<Wallet>){};
  
  async create(createWalletDto: CreateWalletDto) {
  const newWallet = this.walletRepository.create(createWalletDto);
    await this.usersService.findOne( newWallet.user.id );
    return this.walletRepository.save(newWallet);
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
     
    return this.walletRepository.update(id, updateWalletDto);
    
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
