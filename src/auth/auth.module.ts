import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { Wallet } from '@/wallet/entities/wallet.entity';
import { WalletController } from '@/wallet/wallet.controller';
import { WalletService } from '@/wallet/wallet.service';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    TypeOrmModule.forFeature([User, Wallet]),
  ],
  controllers: [AuthController, WalletController],
  providers: [
    AuthService,
    AuthHelper,
    JwtStrategy,
    WalletService,
    UsersService,
  ],
})
export class AuthModule {}
