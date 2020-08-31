import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { ManageChatBotModule } from './manage-chat-bot/manage-chat-bot.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'NvlR1F3wgJ',
      password: 'jd1LzffFGc',
      database: 'NvlR1F3wgJ',
      entities: [],  
      // synchronize: true,
      autoLoadEntities: true, 
    }),
    UsersModule,
    ChatBotModule,
    ManageChatBotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
