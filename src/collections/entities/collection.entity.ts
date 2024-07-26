import { Nft } from '../../nfts/entities/nft.entity'
import { User } from '../../users/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User
  
  @OneToMany(() => Nft, nft => nft.collection)
  nfts: Nft[];
}