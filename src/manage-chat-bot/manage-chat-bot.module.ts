import { Module } from '@nestjs/common';
import { ManageChatBotController } from './manage-chat-bot.controller';
import { ManageChatBotService } from './manage-chat-bot.service';
import { ManageChatBot } from './manage-chat-bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ManageChatBot])],
  controllers: [ManageChatBotController],
  providers: [ManageChatBotService]
})
export class ManageChatBotModule {}
