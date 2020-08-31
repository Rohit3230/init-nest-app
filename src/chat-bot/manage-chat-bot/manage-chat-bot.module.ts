import { Module } from '@nestjs/common';
import { ManageChatBotController } from './manage-chat-bot.controller';
import { ManageChatBotService } from './manage-chat-bot.service';

@Module({
  controllers: [ManageChatBotController],
  providers: [ManageChatBotService]
})
export class ManageChatBotModule {}
