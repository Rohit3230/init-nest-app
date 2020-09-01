// import {
//     SubscribeMessage,
//     WebSocketGateway,
//     WebSocketServer,
//     WsResponse,
//     OnGatewayInit
//   } from '@nestjs/websockets';
//   import { from, Observable, async } from 'rxjs';
//   import { map } from 'rxjs/operators';
//   import { Server } from 'ws';
//   const request = require('request');
//   import { Logger } from "@nestjs/common";
  
//   @WebSocketGateway(3230)
//   export class EventsGateway implements OnGatewayInit {

//     private logger: Logger = new Logger("AppGateway");

//   afterInit(server: any) {
//     // throw new Error('Method not implemented.'); - comment this
//     this.logger.log("Initialized");
//   }
//   // export class AppGateway {
//   @SubscribeMessage("events")
//   handleMessage(client: any, payload: any): any {
//       console.log('a',payload);
//       let apiUrl = 'http://localhost:3000/contents/getContent/'+payload.id;
//       console.log('apiUrl***',apiUrl);  

//             let f1 = function callAPI(apiUrl){
//                 request(apiUrl, function (error, response, body) {
//                     console.error('error:', error); // Print the error if one occurred
//                     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//                     console.log('body:', body); // Print the HTML for the Google homepage.
//                     result = body;
//                     return body;
//                     // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
//                 });
//             }

//         let result : any;
//         async function f(apiUrl) {
//             var data = await f1(apiUrl);
//             result = data;
//             return data;
//         }
//         return f(apiUrl).then(result);
//     // return "Hello world!";
//   }


//     // @WebSocketServer()
//     // server: Server;

    
  
//     // @SubscribeMessage('events')
//     // onEvent(client: any, data: any): Observable<WsResponse<number>> {
//     //     // console.log('Client***', client);  
//     //     console.log('Client Data***', data);  

//     //     // let f1 = function callAPI(apiUrl){
//     //     //     request(apiUrl, function (error, response, body) {
//     //     //         console.error('error:', error); // Print the error if one occurred
//     //     //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     //     //         console.log('body:', body); // Print the HTML for the Google homepage.
//     //     //         result = body;
//     //     //         return body;
//     //     //         // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
//     //     //     });
//     //     // }

//     //     // let result : any;
//     //     // async function f(apiUrl) {
//     //     //     await f1(apiUrl);
//     //     //   }

           

//     //     let apiUrl = 'http://localhost:3000/contents/getContent/'+data.id;
//     //     let result : any;
//     //     request(apiUrl, function (error, response, body) {
//     //         console.error('error:', error); // Print the error if one occurred
//     //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     //         console.log('body:', body); // Print the HTML for the Google homepage.
//     //         result = body; 
//     //         // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
//     //     });

//     //     // f(apiUrl).then();  

//     //    return from([1]).pipe(map(item => ({ event: 'events', data: result })));
  
//     // }
//   }