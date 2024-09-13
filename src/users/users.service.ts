import { RegisterUserAuthDto } from '../auth/dto/register-auth.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor (private readonly databaseService:DatabaseService){

  }
  create(createUserDto: Prisma.usersCreateInput) {
    return this.databaseService.users.create({
      data: createUserDto,
    });
  }
  async findByUsername(createUserDto:RegisterUserAuthDto, username: string,) {
    const existing = this.databaseService.users.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        username: true,
      },
    });
    if (!existing) {
      throw new ConflictException(`User with username "${username}" already exists`);
    }
    return this. databaseService.users.create({
      data: {
        username,
        password: createUserDto.password,
        name: createUserDto.name,
        email: createUserDto.email,
      },
    })
  }

  findAll() {
    return this.databaseService.users.findMany({

    });
  }

  findOne(id: number) {
    return this.databaseService.users.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: Prisma.usersUpdateInput) {
    return this.databaseService.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.databaseService.users.delete({
      where: {
        id,
      },
    })
  }
}
