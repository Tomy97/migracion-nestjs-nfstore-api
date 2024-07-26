import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@/users/users.service';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async create(newCollection: CreateCollectionDto) {
    const collection = this.collectionRepository.create(newCollection);
    await this.usersService.findOne(collection.owner.id);
    return this.collectionRepository.save(collection);
  }

  async findAll(filters?: any, user?: User): Promise<Collection[]> {
    if (filters.myCollections) {
      return this.collectionRepository.find({
        where: { owner: { id: user.id } },
      });
    }
    return this.collectionRepository.find();
  }

  async findOne(id: number) {
    const collection = await this.collectionRepository.findOne({
      where: { id },
    });
    if (!collection) {
      throw new NotFoundException(`Collections ${id} no encontrado`);
    }

    return collection;
  }

  update(id: number, collection: UpdateCollectionDto) {
    return this.collectionRepository.update(id, collection);
  }

  remove(id: number) {
    return this.collectionRepository.delete(id);
  }
}
