import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { CustomMatchPasswords } from '../customValidator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  // @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  // @MaxLength(20)
  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirmation: string;
}
