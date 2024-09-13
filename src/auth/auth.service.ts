import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService, private jwtService:JwtService, private readonly usersService:UsersService){
    
  }
  
  async login(loginAuthDto: LoginAuthDto):Promise<any> {
    const {username, password} = loginAuthDto

    const users = await this.databaseService.users.findUnique({
      where: {
        username
      }
    })
    console.log('---------------------------Users-----------------------')
    console.log(users)

    if(!users){
      throw new NotFoundException('User not found')
    }
    console.log(password)
    console.log(users.password)

    if (!(await bcrypt.compare(password, users.password))){
      throw new NotFoundException('InvalidPassword')
    }

    return {
      token: this.jwtService.sign({
        username,
        password
      })
    }
  }

  async register(createDto: RegisterUserAuthDto): Promise<any> { 
    const hashedPassword = await bcrypt.hash(createDto.password, 10)
    return this.usersService.create({
      ...createDto,
      password: hashedPassword,
    }
      
  )
  }
}
