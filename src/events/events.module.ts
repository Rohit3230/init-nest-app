import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway'; 
import { ContentsService } from '../content/contents.service'; 
import { Content, ContentSchema } from '../content/schemas/content.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  providers: [EventsGateway, ContentsService],
})
export class EventsModule {}