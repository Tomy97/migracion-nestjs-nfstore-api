import { async } from 'rxjs';
import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  public register(@Body() body: RegisterAuthDto): Promise<User> {
    return this.service.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    return await this.service.login(email, password);
  }

  @Post('refresh')
  public refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }
}
