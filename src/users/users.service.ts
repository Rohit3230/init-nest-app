import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id:string, createUserDto: CreateUserDto): Promise<User>{
    const user = await this.usersRepository.findOne({
      where: { id }
    });
    
    return this.usersRepository.save({
      ...user, // existing fields
      ...createUserDto // updated fields
    });
    // const user = new User();
    // user.id = id;
    // user.firstName = createUserDto.firstName;
    // user.lastName = createUserDto.lastName;

    // return this.usersRepository.save(user);
    // *************
  //   return this.usersRepository.save({
  //     id: id,
  //     createUserDto.firstName,
  //     createUserDto.lastName
  // });
  }
}
