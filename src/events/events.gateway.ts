import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit
} from '@nestjs/websockets';
const request = require('request');
import { Logger } from "@nestjs/common";
import { ContentsService } from '../content/contents.service';

@WebSocketGateway(3230)
export class EventsGateway implements OnGatewayInit {
  constructor(
    private readonly contentsService: ContentsService
  ) { }

  private logger: Logger = new Logger("AppGateway");

  afterInit(server: any) {
    this.logger.log("Initialized");
  }

  @SubscribeMessage("events")
  handleMessage(client: any, clientData: any): any {
    return this.contentsService.findRelated(clientData.id);
  }
}