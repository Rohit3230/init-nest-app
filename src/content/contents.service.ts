// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ContentsService {}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './schemas/content.schema';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentsService {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const createdContent = new this.contentModel(createContentDto);
    return createdContent.save();
  }

  async update(createContentDto:CreateContentDto):Promise<Content> {
    const createdContent = new this.contentModel(createContentDto);
    return createdContent.save();
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  async findRelated(parentId): Promise<Content[]>{
    console.log('INIT getContent***2*', parentId);
    return this.contentModel.find({ 'parentId' : parentId  });
  }
}

