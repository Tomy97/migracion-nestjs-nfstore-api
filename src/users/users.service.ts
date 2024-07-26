import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        wallet: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User ${id} no encontrado`);
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number, user: UpdateUserDto) {
    return this.usersRepository.update(id, user);
  }

  async getUser(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async register(user: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async login(credentials: any) {
    try {
      const user = await this.usersRepository.findOne({ where: credentials });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return user;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
