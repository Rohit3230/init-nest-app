import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
const request = require('request');
import { Logger } from "@nestjs/common";
import { ContentsService } from '../content/contents.service';

@WebSocketGateway(3230)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly contentsService: ContentsService
  ) { }

  private logger: Logger = new Logger("AppGateway");

  afterInit(server: any) {
    this.logger.log("Initialized");
  }

   @WebSocketServer() server;
    users: number = 0;

    async handleConnection(){
      

        // A client has connected
        this.users++;

        console.log('handleConnection***',this.users);

        // Notify connected clients of current users
        this.server.emit('events', this.users);

    }

    async handleDisconnect(){
      
        // A client has disconnected
        this.users--; 

        console.log('handleDisconnect***',this.users);

        // Notify connected clients of current users
        // this.server.emit('users', this.users);

    }


  @SubscribeMessage("events")
  handleMessage(client: any, clientData: any): any {
    // console.log('client***',client);
    console.log('clientData***',clientData);
    console.log('Data****',this.contentsService.findRelated(clientData.id));
    return this.contentsService.findRelated(clientData.id);
  }
}