import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Collection } from 'src/collections/entities/collection.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateNftDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  file: Express.Multer.File;

  @IsBoolean()
  isSale?: boolean = false;

  // @IsNotEmpty()
  @Type(() => User)
  create: User;

  // @IsNotEmpty()
  @Type(() => User)
  owner: User;

  @IsNotEmpty()
  @Type(() => Collection)
  collection: Collection;
}
