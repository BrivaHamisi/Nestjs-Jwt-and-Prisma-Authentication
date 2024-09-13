import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.usersCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Req() request:Request, @Res() response:Response):Promise<any> {
    try{
      const result = await this.usersService.findAll();
      return response.status(200).json({
        status: 'ok!',
        message: 'Successfully fetch data!',
        result: result
      });
    }
    catch(error){
      return response.status(500).json({
        status: 'ok!',
        message: 'Failed to fetch data!',
        error: error
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.usersUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
