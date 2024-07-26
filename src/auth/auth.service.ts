import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthHelper } from './auth.helper';
import { Wallet } from '@/wallet/entities/wallet.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @InjectRepository(Wallet)
  private readonly walletRepository: Repository<Wallet>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterAuthDto): Promise<User> {
    const { userName, email, password }: RegisterAuthDto = body;

    const existUserEmail: User = await this.repository.findOne({
      where: { email },
    });

    if (existUserEmail) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const user = new User();
    const wallet = new Wallet();
    // const wallet = this.collectionsService.create()
    wallet.balance = 0;
    user.wallet = wallet;
    user.userName = userName;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    // await this.walletRepository.save(wallet);
    await this.walletRepository.save(wallet);
    await this.repository.save(user);
    // await this.repository.save([user, wallet]);

    return user;
  }

  public async login(email: string, password: string) {
    const user: User = await this.repository.findOne({
      where: { email },
    });
    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );
    try {
      this.repository.update(user.id, { lastLoginAt: new Date() });
      const token = this.helper.generateToken(user);
      return {token: token};
    } catch (error: any) {
      if (!user || !isPasswordValid) {
        throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
    }
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async getUser(id: number): Promise<number> {
    const user: User = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return user.id;
  }
}
