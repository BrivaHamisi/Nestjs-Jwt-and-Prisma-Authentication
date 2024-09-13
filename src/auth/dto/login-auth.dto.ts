import { isEmail } from './../../../node_modules/@types/validator/index.d';
import { IsString, Length } from "class-validator";

export class LoginAuthDto {

    @IsString()
    @Length(5,10)
    username: string;

    @IsString()
    @Length(6,12)
    password: string;

}
