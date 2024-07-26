import { Column } from "typeorm";

export class Auth {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userName: string;
}
