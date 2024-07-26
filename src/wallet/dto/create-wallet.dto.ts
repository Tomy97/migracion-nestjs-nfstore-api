import { User } from "@/users/entities/user.entity";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWalletDto {
    @IsNotEmpty()
    @Type(() => User)
    user: User;

    @IsNumber()
    balance?: number = 0;
}
