import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBot } from './chat-bot.entity';
import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';

// @Module({
//   controllers: [ChatBotController],
//   providers: [ChatBotService]
// })
@Module({
  imports: [TypeOrmModule.forFeature([ChatBot])],
  providers: [ChatBotService],
  controllers: [ChatBotController],
})
export class ChatBotModule {}
