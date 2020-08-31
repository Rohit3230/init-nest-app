import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      //  MongooseModule.forRoot('mongodb://Rohit3230:rsn3230@ds225492.mlab.com:25492/test3230'),
      MongooseModule.forRoot('mongodb://public:public@ds137826.mlab.com:37826/node-crud'),
      UsersModule
    ],
  // controllers: [AppController, UsersController],
  // providers: [AppService, UsersService],
})
export class AppModule {}
