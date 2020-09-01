import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsModule } from './content/contents.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
      //  MongooseModule.forRoot('mongodb://Rohit3230:rsn3230@ds225492.mlab.com:25492/test3230'),
      MongooseModule.forRoot('mongodb://public:public@ds137826.mlab.com:37826/node-crud'),
      ContentsModule,
      EventsModule
    ]
})
export class AppModule {}
