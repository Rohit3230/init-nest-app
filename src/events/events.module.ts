import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
// import { HitAPIService } from './hitApiService';
import { ContentsService } from '../content/contents.service';
import { ContentsModule } from '../content/contents.module';
import { Content } from '../content/schemas/content.schema';

@Module({
  // imports : [Content],
  providers: [EventsGateway],
})
export class EventsModule {}