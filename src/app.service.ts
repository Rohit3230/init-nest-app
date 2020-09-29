import { Injectable, HttpStatus } from '@nestjs/common';
var fs = require('fs');
const tesseract = require("node-tesseract-ocr");
import { 
          getCheckData,
          getAadharData,
          getPanData,
          getPassportData,
          getDrivingLicenceData,
          validatedExtractedData
        } from './utils/extract-OCR.util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World, This tutorial is for learning Nest.Js framework of NodeJs !';
  }

  processDocData(res, fileType: string, file: any): any {
    // let response: any;
    let supportedFiles = ['aadhar', 'aadharcard', 'pan', 'pancard', 'drivinglicence', 'passport', 'check', 'cancelcheck'];
    if (!fileType) {
      return 'INVALID_ARGS'
    }
    fileType = fileType.replace(/ /g, ''); // remove all spaces
    fileType = fileType.toLowerCase();   // convert to lowercase

    console.log('isSupported***', supportedFiles.indexOf(fileType) != -1);

    if (
      supportedFiles.indexOf(fileType) != -1
      &&
      file
      &&
      file.originalname
    ) {

      let reqFileNameForOCR = file.path;
      // reqFileNameForOCR = 'src\\aadhara.jpg';
      // tesseract "src\\aadhara.jpg" stdout --oem 1 --psm 3

      const config = {
        lang: "eng",
        // lang: "eng+hin",
        oem: 1,
        psm: 3,
      }

      // console.log('tesseract***',tesseract);

      // tesseract.recognize(reqFileNameForOCR, config)
      //   .then(text => {
      //     console.log("1 Result:", text);
      //   })
      //   .catch(error => {
      //     console.log("1 error:",error.message);
      //   });

      let callMe = async function () {
        const result = await tesseract.recognize(reqFileNameForOCR, config);
        console.log('callMe function:- result:- ', result);

        let linesArray = result.split('\n');
          let responseObj : any;
          switch (fileType) {
            case 'aadhar':
            case 'aadharcard':
              responseObj = getAadharData(linesArray);
              break;
            case 'pan':
            case 'pancard':
              responseObj = getPanData(linesArray);
              break;
            case 'passport':
              responseObj = getPassportData(linesArray);
              break;
            case 'drivinglicence':
              responseObj = getDrivingLicenceData(linesArray);
              break;
            case 'check':
            case 'cancelcheck':
              responseObj = getCheckData(linesArray);
              break;
            default:

              break;
          }
          responseObj = validatedExtractedData(responseObj);
          if(
            responseObj.isValidated
          ){
            delete responseObj.isValidated;
            res.status(HttpStatus.OK).json({
              status: "OK",
              message: "OK",
              result: responseObj
            });
          }else{
            delete responseObj.isValidated;
            res.status(HttpStatus.BAD_REQUEST).json({
              status: "BAD_REQUEST",
              message: 'Not getting all reuired values from uploaded '+fileType+'. It can be invalid file. Please check and upload again.',
              result: responseObj
            });
          }

        // var data = ''; 

        // var readStream = fs.createReadStream('stdout.txt', 'utf8');

        // readStream.on('data', function (chunk) {
        //   data += chunk;
        //   console.log('data****',data);
        //   data += chunk;
        // }).on('end', function () {

          
        // });

      }

      callMe()
        .then(function (result) {
          console.log('then result***', result);
        })
        .catch(error => console.log('catch error***', error));
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: "BAD_REQUEST",
        message: 'Select valid file type like.. aadhar, pan, drivinglicence, passport, check'
      });
    }


  }
}
