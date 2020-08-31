// import { Controller } from '@nestjs/common';

// @Controller('users')
// export class UsersController {}

import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
 
@Controller('users')
export class UsersController { 
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() res, @Body() createCatDto: CreateUserDto) {
    await this.usersService.create(createCatDto).then((result)=>{
        res.status(HttpStatus.OK).json({
            message: "OK",
            result: result ? result : []
        });
    }).catch((err)=>{
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "NOK",
            result: err
        });
    });
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}

