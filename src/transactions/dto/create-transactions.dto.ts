import { IsNotEmpty, IsString, IsNumber, ArrayNotEmpty, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateNftDto } from '../../nfts/dto/create-nft.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Nft } from '@/nfts/entities/nft.entity';
import { User } from '@/users/entities/user.entity';

export class CreateTransactionsDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @Type(() => Nft)
  nft: Nft;

  @IsNotEmpty()
  @Type(() => User)
  seller: User;

  @IsNotEmpty()
  @Type(() => User)
  buyer: User;
}
