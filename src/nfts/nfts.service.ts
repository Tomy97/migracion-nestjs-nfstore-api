import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Nft } from './entities/nft.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionsService } from '@/collections/collections.service';
import { UsersService } from '@/users/users.service';
import { TransactionsService } from '../transactions/transactions.service';
import mercadopago from 'mercadopago';
@Injectable()
export class NftsService {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly usersService: UsersService,
    private readonly transactionsService: TransactionsService,
    @InjectRepository(Nft) private nftRepository: Repository<Nft>,
  ) {}

  // async create(nft: Express.Multer.File) {
  async create(nft: CreateNftDto) {
    console.log('log desde el service', nft);
    const newNft = new Nft();
    newNft.name = nft.file.originalname;
    newNft.imagePath = nft.file.path;
    await this.collectionsService.findOne(nft.collection.id);
    await this.usersService.findOne(newNft.owner.id);
    await this.usersService.findOne(newNft.create.id);
    return this.nftRepository.save(newNft);
  }

  async buy(nft: any, buyer: number) {
    console.log('nft.id', nft.id);
    
    const nftUpdate = await this.findOne(nft.id);
    console.log('nftUpdate', await nftUpdate);
    console.log('buyer', buyer);
    const newOwner = await this.usersService.findOne(buyer);
    console.log('newOwner', await newOwner.id);
    console.log('newOwner', await nftUpdate.owner.id);

    if (newOwner.id === nftUpdate.owner.id) {
      console.log('`aca entre3`');
      throw new NotFoundException(
        `No podes comprar un nft que vos sos el dueño.`,
      );
    }

    if (!nftUpdate.isSale) {
      console.log('aca entre2');
      throw new NotFoundException(
        `No podes comprar un nft que no esta en venta.`,
      );
    }

    const preference = {
      items: [
        {
          title: 'Mi producto',
          unit_price: 100,
          quantity: 1,
        },
      ],
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log('newOwner.wallet.balance', newOwner);
    // if (newOwner.wallet.balance < nftUpdate.price) {
    //   console.log('aca entre1');
    //   throw new NotFoundException(
    //     `No tenes suficente dinero para comprar este nft.`,
    //   );
    // }

    nftUpdate.owner.id = newOwner.id;
    console.log('aca llege');

    await this.nftRepository.save(nftUpdate);

    const transaction = {
      amount: nftUpdate.price,
      buyer: newOwner,
      seller: nftUpdate.owner,
      nft: nftUpdate,
    };
    await this.transactionsService.create(transaction);
    console.log('nftUpdate', nftUpdate);
    console.log('transaction', transaction);

    return nftUpdate;
  }

  async sell(nft: number, sell: number) {
    const nftSell = await this.findOne(nft);
    const seller = await this.usersService.findOne(sell);

    if (nftSell.owner.id != seller.id) {
      throw new NotFoundException(
        `No podes poner a la venta un nft que no sos dueño.`,
      );
    }

    if (nftSell.isSale) {
      throw new NotFoundException(`Este nft ya esta a la venta.`);
    }

    nftSell.isSale = true;
    const nftUpdated = this.update(nftSell.id, nftSell);

    return nftUpdated;
  }

  async findAll() {
    return await this.nftRepository.find({
      relations: {
        create: true,
        owner: true,
        collection: true,
      },
    });
  }

  async findOne(id: number) {
    const nft = await this.nftRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        create: true,
        owner: true,
        collection: true,
      },
    });

    if (!nft || nft === null) {
      throw new NotFoundException(`Nft ${id} no encontrado`);
    }
    return nft;
  }

  async update(id: number, nft: UpdateNftDto) {
    return await this.nftRepository.update(id, nft);
  }

  remove(id: number) {
    return this.nftRepository.delete(id);
  }
}
