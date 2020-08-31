// import { Controller } from '@nestjs/common';

// @Controller('chat-bot')
// export class ChatBotController {}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChatBotDto } from './dto/chat-bot';
import { ChatBot } from './chat-bot.entity';
import { ChatBotService } from './chat-bot.service';

@Controller('chat-bot')
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  // @Post()
  // create(@Param('addNew') addNew: boolean, @Body() chatBotDto: ChatBotDto): Promise<ChatBot> {
  //   // console.log('addNew****', addNew);
  //   return this.chatBotService.create(addNew, chatBotDto);
  // }

  @Post()
  create(@Body() chatBotDto: ChatBotDto): Promise<ChatBot> {
    return this.chatBotService.create(chatBotDto);
  }

  // @Get()
  // findAll(): Promise<ChatBot[]> {
  //   return this.chatBotService.findAll();
  // }
  @Get()
  findAll(): Promise<ChatBot[]> {
    return this.chatBotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChatBot> {
    return this.chatBotService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() chatBotDto: ChatBotDto): Promise<ChatBot> {
    return this.chatBotService.update(id, chatBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.chatBotService.remove(id);
  }



//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<ChatBot> {
//     return this.chatBotService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() chatBotDto: ChatBotDto): Promise<ChatBot> {
//     return this.chatBotService.update(id, chatBotDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.chatBotService.remove(id);
//   }
}

