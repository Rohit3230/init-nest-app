import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    let createdUser = this.usersService.create(createUserDto).then(respData=>{
      console.log('respData****', respData);  
      return respData;
    });
    console.log('createdUser****', createdUser);
    // return createdUser;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  @Get(':id')
    get(@Param() params) {
        return this.usersService.getUser(params.id);
    }

  @Put(':id')
  update(@Param('id') id: string, @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.update(id, createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
