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

  processDocData(res, fileType: string, files: any): any {
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
      files
      &&
      files[0]
      &&
      files[0].originalname
    ) {
      let reqFileNameForOCR = files[0].path;
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
      let filesDataArr= [];
      let callMe = async function (files : any) {
        for(const file of files){
          const result = await tesseract.recognize(file.path, config);
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
          filesDataArr.push(responseObj);
        }

      }

      callMe(files)
        .then(function (result) {
          console.log('then filesDataArr***', filesDataArr);

          let responseObj : any;
          for(let fD = 0; fD<= filesDataArr.length-1;fD++){
            !responseObj ? responseObj = filesDataArr[fD]:'';
            if(
              fD != 0 
            ){
              var fileData = filesDataArr[fD];
              for(let fDKI=0; fDKI <= (Object.keys(fileData)).length-1;fDKI++){
                let fileKeyName = (Object.keys(fileData))[fDKI];
                if(
                  fileData[fileKeyName]
                  &&
                  !responseObj[fileKeyName]
                ){
                  responseObj[fileKeyName] = fileData[fileKeyName];
                }
              }
            }
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
              message: 'Not getting all required values from uploaded '+fileType+' file. It can be invalid file. Please check and upload again.',
              result: responseObj
            });
          }

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
