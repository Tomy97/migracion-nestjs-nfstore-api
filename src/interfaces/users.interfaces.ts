import { Wallet } from '@/wallet/entities/wallet.entity';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name?: string;
  avatar: string;
  permissions: string;
  wallet: Wallet;
  lastLoginAt: Date | null;
}
