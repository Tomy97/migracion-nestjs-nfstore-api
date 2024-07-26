import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './entities/nft.entity';
import { CollectionsService } from '@/collections/collections.service';
import { Collection } from '@/collections/entities/collection.entity';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { Transaction } from '@/transactions/entities/transactions.entity';
import { TransactionsService } from '@/transactions/transactions.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer/multer.service';
import { ConfigModule } from '@nestjs/config';

MulterModule.registerAsync({
  // imports: [ConfigModule],
  useClass: MulterConfigService,
});
@Module({
  imports: [TypeOrmModule.forFeature([Nft, Collection, User, Transaction])],
  controllers: [NftsController],
  providers: [
    NftsService,
    CollectionsService,
    UsersService,
    TransactionsService,
    MulterConfigService,
  ],
})
export class NftsModule {}
