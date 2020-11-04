import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private connection: Connection,
    // private queryRunner: QueryRunner
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async createMany(users: User[]) {
    console.log('createMany*****',users);
    const queryRunner = this.connection.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      // await queryRunner.manager.save(users[1]);
  
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findAll(): Promise<User[]> {

    let queryString : string;
    // queryString = 'select * from user';
    // queryString = 'SELECT * FROM `manage_chat_bot` as mCB jOIN chat_bot as cB on cB.id = mCB.quesId';
    // queryString = 'INSERT INTO `user`(`firstName`, `lastName`, `age`) VALUES (?,?,?)';
    queryString = 'select * from user where age>=?';

    let params=[];
    params = [20];
    
    console.log('Query***',queryString,'***Pparams***',params);
    const users = await this.usersRepository.query(queryString, params);
    console.log('Found users*****', users);
    
    // const usersArr = this.queryRunner.query(`select * from user`);
    // console.log('Found usersArr*****', JSON.stringify(usersArr));

    return this.usersRepository.find(); 
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async getUser(_id: number): Promise<User[]> {
    const userObj = await this.usersRepository.find({
        select: ["firstName", "lastName"],
        // from: ["users"],
        where: [{ "id": _id }]
    });
    console.log('user****',userObj);
    return userObj; 
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
