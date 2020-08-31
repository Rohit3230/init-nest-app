import { Test, TestingModule } from '@nestjs/testing';
import { ManageChatBotController } from './manage-chat-bot.controller';

describe('ManageChatBot Controller', () => {
  let controller: ManageChatBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageChatBotController],
    }).compile();

    controller = module.get<ManageChatBotController>(ManageChatBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
