import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ChatBotDto } from './dto/chat-bot';
import { ChatBot } from './chat-bot.entity';
// import { serialize } from 'v8';

@Injectable()
export class ChatBotService {
    constructor(
        @InjectRepository(ChatBot)
        private readonly chatBotRepository: Repository<ChatBot>,
      ) {}

    create(createUserDto: ChatBotDto): Promise<ChatBot> {
        // console.log('addNew***',addNew);
        const chatBot = new ChatBot();
        chatBot.content = createUserDto.content;
        chatBot.type = createUserDto.type;
    
        return this.chatBotRepository.save(chatBot);
      }

      async findAll(): Promise<ChatBot[]> {
        return this.chatBotRepository.find();
      }

      findOne(id: string): Promise<ChatBot> {
        return this.chatBotRepository.findOne(id);
      }

      update(id:string, chatBotDto:ChatBotDto): Promise<ChatBot>{
        let content = this.chatBotRepository.findOne({
          where: { id }
        });
        // console.log('content for update ***', id ,JSON.stringify(content), serialize(content));
        return this.chatBotRepository.save({
          ...content, // existing fields
          ...chatBotDto // updated fields
        });
      }

      async remove(id : string) : Promise<void>{
        await this.chatBotRepository.delete(id);
      }

      // async findQuesAns(quesId:string) : Promise<ChatBot>{
      //   // return await this.chatBotRepository.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
      //   // .then(results => {
      //   //   console.log('Results***', results);
      //   // })
      //   // return await this.chatBotRepository.createQueryBuilder("SELECT * FROM `users`")
      //   // .then(results => {
      //   //   console.log('Results***', results);
      //   // });
      // }
}
