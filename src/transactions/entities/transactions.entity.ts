import { Nft } from '../../nfts/entities/nft.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Nft, { eager: true })
  nft: Nft;

  @ManyToOne(() => User, { eager: true })
  seller: User;

  @ManyToOne(() => User, { eager: true })
  buyer: User;
}
