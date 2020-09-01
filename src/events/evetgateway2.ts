import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable, async } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'ws';
  const request = require('request');
  
  @WebSocketGateway(3230)
  export class EventsGateway {

    @WebSocketServer()
    server: Server;

    
  
    @SubscribeMessage('events')
    onEvent(client: any, data: any): Observable<WsResponse<number>> {
        // console.log('Client***', client);  
        console.log('Client Data***', data);  

        // let f1 = function callAPI(apiUrl){
        //     request(apiUrl, function (error, response, body) {
        //         console.error('error:', error); // Print the error if one occurred
        //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //         console.log('body:', body); // Print the HTML for the Google homepage.
        //         result = body;
        //         return body;
        //         // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
        //     });
        // }

        // let result : any;
        // async function f(apiUrl) {
        //     await f1(apiUrl);
        //   }

           

        let apiUrl = 'http://localhost:3000/contents/getContent/'+data.id;
        let result : any;
        request(apiUrl, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            result = body; 
            // return from([1]).pipe(map(item => ({ event: 'events', data: body })));
        });

        // f(apiUrl).then(); 
        

        // function wait(ms){
        //     var start = new Date().getTime();
        //     var end = start;
        //     while(end < start + ms) {
        //       end = new Date().getTime();
        //    }
        //  }
        
        //  console.log('before', new Date());
        // wait(7000);  //7 seconds in milliseconds
        // console.log('after', new Date());
        // console.log('Final Execution***', new Date());
 

        // setTimeout(function(){
            
        // },1000);

       return from([1]).pipe(map(item => ({ event: 'events', data: result })));

    //   return this.http.get('http://localhost:3000/contents/getContent/'+data.id)
    //         .pipe(
    //             map(response => response.data)
    //         );   
    }
  }