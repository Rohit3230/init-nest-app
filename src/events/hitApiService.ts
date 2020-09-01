import { Injectable } from '@nestjs/common';
const request = require('request');
@Injectable()
export class HitAPIService {
  constructor() {}

  async get(apiUrl) : Promise<any> {
    var f1 = function(apiUrl, callback){
      request(apiUrl, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        callback(null, body);
      });
    }
    f1(apiUrl, function(err, result){
      console.log('Data***', err, result);
      return result;
    });
  }
}