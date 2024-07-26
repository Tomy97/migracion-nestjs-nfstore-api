import { Collection } from '../../collections/entities/collection.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  TableForeignKey,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Nft {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  imagePath: string;

  @Column({ nullable: true })
  isSale: boolean;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'create_id' })
  create: User;

  @ManyToOne(() => Collection, (collection) => collection.nfts)
  collection: Collection;
}
