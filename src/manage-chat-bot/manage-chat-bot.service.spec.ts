import { Test, TestingModule } from '@nestjs/testing';
import { ManageChatBotService } from './manage-chat-bot.service';

describe('ManageChatBotService', () => {
  let service: ManageChatBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageChatBotService],
    }).compile();

    service = module.get<ManageChatBotService>(ManageChatBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
