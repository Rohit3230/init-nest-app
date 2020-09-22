import { Body, Controller, Get, Post, Res, HttpStatus, Param, Put } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './schemas/content.schema';
 
@Controller('contents')
export class ContentsController { 
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  async create(@Res() res, @Body() createCatDto: CreateContentDto) {
    await this.contentsService.create(createCatDto).then((result)=>{
        res.status(HttpStatus.OK).json({
            message: "OK",
            result: result ? result : []
        });
    }).catch((err)=>{
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "NOK",
            result: err
        });
    });
  }

  @Put()
  async update(@Res() res, @Body() createCatDto: CreateContentDto) {
    await this.contentsService.update(createCatDto).then((result)=>{
        res.status(HttpStatus.OK).json({
            message: "OK",
            result: result ? result : []
        });
    }).catch((err)=>{
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "NOK",
            result: err
        });
    });
  }

  @Get()
  findAll(): Promise<Content[]> {
    return this.contentsService.findAll();
  }

  @Get('getContent/:parentId')
  findRelated(@Param('parentId') parentId: string): Promise<Content[]> {
    console.log('INIT getContent****',parentId);
    return this.contentsService.findRelated(parentId);
  }
}

