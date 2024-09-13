import { IsString, Length } from 'class-validator';

export class RegisterUserAuthDto {

    @IsString()
    @Length(5,10)
    username: string;

    @IsString()
    @Length(6,12)
    password: string;

    @IsString()
    name:string

    @IsString()
    email: string

}
