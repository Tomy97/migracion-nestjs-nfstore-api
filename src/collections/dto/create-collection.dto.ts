import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCollectionDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @Type(() => User)
    owner: User;
}
