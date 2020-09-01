import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayInit
  } from '@nestjs/websockets';
  import { from, Observable, async } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'ws';
  const request = require('request');
  import { Logger, HttpService } from "@nestjs/common";
  // import { HitAPIService } from './hitApiService';
  // inport { HttpService } from '@nest/common';
  import { ContentsService } from '../content/contents.service';
  import { Content } from '../content/schemas/content.schema';
  
  
  @WebSocketGateway(3230)
  export class EventsGateway implements OnGatewayInit {
      constructor(
        // private hitApi:HitAPIService,
        // private readonly contentsService: ContentsService
        ){}

    private logger: Logger = new Logger("AppGateway");

  afterInit(server: any) {
    // throw new Error('Method not implemented.'); - comment this
    this.logger.log("Initialized");
  }
  // export class AppGateway {
  @SubscribeMessage("events")
  handleMessage(client: any, payload: any): any {
      // console.log('a',payload);
      // let apiUrl = 'http://localhost:3000/contents/getContent/'+payload.id;
      // console.log('apiUrl***',apiUrl);  

      //       async function callAPI(apiUrl){
      //           return await request(apiUrl, function (error, response, body) {
      //               // console.error('error:', error); // Print the error if one occurred
      //               // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //               console.log('body:', body); // Print the HTML for the Google homepage.
      //               // result = body;
      //               return body;
      //               // calback(null, body);
      //               // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
      //           });
      //       }

      //   let result : any;
        // function f(apiUrl) {
        //     callAPI(apiUrl, function(err, resp){
        //         result = resp;
        //         console.log('Resp result**', err,result);
        //         // return result;
        //     });
        //     // result = data;
            
        // }
        // var finalData = f(apiUrl);
        // callAPI(apiUrl);

        // console.log('result****',callAPI(apiUrl));
        // return callAPI(apiUrl);
        // return request(apiUrl, function (error, response, body) {
        //     console.log('body:', body);
        //     // return body;
        // });
        // return this.http.get(apiUrl);
        // return this.hitApi.get(apiUrl);
        // findRelated(@Param('parentId') parentId: string): Promise<Content[]> {
        //   console.log('INIT getContent****',parentId);
          // return this.contentsService.findRelated(payload.id);
          return 'Hi from server';
        // }
    // return "Hello world!";
  } 


    // @WebSocketServer()
    // server: Server;

    
  
    // @SubscribeMessage('events')
    // onEvent(client: any, data: any): Observable<WsResponse<number>> {
    //     // console.log('Client***', client);  
    //     console.log('Client Data***', data);  

    //     // let f1 = function callAPI(apiUrl){
    //     //     request(apiUrl, function (error, response, body) {
    //     //         console.error('error:', error); // Print the error if one occurred
    //     //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     //         console.log('body:', body); // Print the HTML for the Google homepage.
    //     //         result = body;
    //     //         return body;
    //     //         // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
    //     //     });
    //     // }

    //     // let result : any;
    //     // async function f(apiUrl) {
    //     //     await f1(apiUrl);
    //     //   }

           

    //     let apiUrl = 'http://localhost:3000/contents/getContent/'+data.id;
    //     let result : any;
    //     request(apiUrl, function (error, response, body) {
    //         console.error('error:', error); // Print the error if one occurred
    //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //         console.log('body:', body); // Print the HTML for the Google homepage.
    //         result = body; 
    //         // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
    //     });

    //     // f(apiUrl).then();  

    //    return from([1]).pipe(map(item => ({ event: 'events', data: result })));
  
    // }
  }