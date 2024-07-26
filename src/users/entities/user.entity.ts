import { BaseEntity } from '@/config/base.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IUser } from '@/interfaces/users.interfaces';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  userName: string;

  // @Column()
  // name: string;

  @Column({
    default:
      'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
  })
  avatar: string;

  @Column({ default: 'user' })
  permissions: string;

  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;
}
