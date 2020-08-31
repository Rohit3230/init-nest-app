import { Controller, Get, Post, Body,Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { ManageChatBotService } from './manage-chat-bot.service';
import { ManageChatBotDto }  from './dto/manage-chat-bot';
import { ManageChatBot } from './manage-chat-bot.entity';

@Controller('manage-chat-bot')
export class ManageChatBotController {

    constructor(
        private readonly manageChatBotService:ManageChatBotService
    ){}
    
    @Get()
    getHello(@Res() res) {
      // return "Hi, It's from manage chat bot.";
      res.status(HttpStatus.OK).json({
          message: "Hi, It's from manage chat bot.",
          result: []
      })
    }

    // @Post()
    // create(@Body() manageChatBotDto:ManageChatBotDto): Promise<>{
    //     return this.
    // }
    @Post()
    create(@Body() manageChatBotDto: ManageChatBotDto): Promise<ManageChatBot> {
      return this.manageChatBotService.create(manageChatBotDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.manageChatBotService.remove(id);
    }

}
