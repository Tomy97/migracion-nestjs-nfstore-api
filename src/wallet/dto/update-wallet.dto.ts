import { User } from "@/users/entities/user.entity";
import { IsNumber } from "class-validator";

export class UpdateWalletDto{ 

    @IsNumber()
    balance?: number = 0;
    
}