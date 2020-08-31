import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Injectable } from '@nestjs/common';
import { ManageChatBotDto } from './dto/manage-chat-bot';
import { ManageChatBot } from './manage-chat-bot.entity';

@Injectable()
export class ManageChatBotService {
    constructor(
        @InjectRepository(ManageChatBot)
        private readonly chatBotRepository: Repository<ManageChatBot>,
      ) {}


    // create():<>
    create(createUserDto: ManageChatBotDto): Promise<ManageChatBot> {
        // console.log('addNew***',addNew);
        const chatBot = new ManageChatBot();
        chatBot.quesId = createUserDto.quesId;
        chatBot.ansId = createUserDto.ansId;
    
        return this.chatBotRepository.save(chatBot);
      }

      async remove(id:number): Promise<void>{
        await this.chatBotRepository.delete(id);
      }
}
