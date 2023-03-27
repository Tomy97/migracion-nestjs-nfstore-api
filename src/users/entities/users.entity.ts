import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/config/base.entity';
import { IUser } from 'src/interfaces/users.interfaces';

@Entity({
  name: 'users',
})
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;
}
