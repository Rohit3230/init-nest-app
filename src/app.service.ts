import { Injectable, HttpStatus } from '@nestjs/common';
var fs = require('fs');
const tesseract = require("node-tesseract-ocr");

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World, This tutorial is for learning Nest.Js framework of NodeJs !';
  }

  getPassportData(fileString: string): any {
    console.log('INIT getPassportData***', fileString);
    return {};
  }

  getDrivingLicenceData(fileString: string): any {
    console.log('INIT getDrivingLicenceData***', fileString);
    return {};
  }

  getCheckData(fileString: string): any {
    console.log('INIT getCheckData***', fileString);
    return {};
  }

  invalidFileData(fileString: string): any {
    console.log('INIT getCheckData***', fileString);
    return {};
  }

  processDocData(res, fileType: string, file: any): any {
    let response: any;
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

      response = {
        originalname: file.originalname,
        filename: file.filename,
      };

      let reqFileNameForOCR = file.path;


      const config = {
        lang: "eng+hin",
        oem: 1,
        psm: 3,
      }

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

        var data = '';

        var readStream = fs.createReadStream('stdout.txt', 'utf8');

        readStream.on('data', function (chunk) {
          // console.log('chunk****',chunk);
          data += chunk;
        }).on('end', function () {
          // console.log('file data***', fileType, data);
          // this.invalidFileData(data);
          let getAadharData = function (linesArray: any): any {
            console.log('INIT getAadharData***', linesArray);
            // let linesArray = fileString.split('\n');
            // console.log('linesArray**', linesArray);
            let reqObj: any = {
              aadharNumber: null,
              gender: null,
              dob: null,
              name: null,
              doesAllValueFound : false
            };
            for (var i = 0; i <= linesArray.length - 1; i++) {
              var currentWordsLine = linesArray[i];
              if (
                currentWordsLine.indexOf('DOB') != -1
              ) {
                if (
                  !reqObj.dob
                  &&
                  currentWordsLine.split(' ')
                  &&
                  currentWordsLine.split(' ').length
                  &&
                  currentWordsLine.split(' ')[currentWordsLine.split(' ').length - 1]
                ) {
                  reqObj.dob = currentWordsLine.split(' ')[currentWordsLine.split(' ').length - 1]
                }

                if (
                  !reqObj.gender
                  &&
                  linesArray[i + 1]
                  &&
                  ((linesArray[i + 1]).toLowerCase()).indexOf('male') != -1
                ) {
                  if (
                    ((linesArray[i + 1]).toLowerCase()).indexOf('female') != -1
                  ) {
                    reqObj.gender = 'Female';
                  } else {
                    reqObj.gender = 'Male';
                  }
                }

                if (
                  reqObj.dob
                  &&
                  reqObj.gender
                  &&
                  !reqObj.name
                ) {
                  reqObj.name = linesArray[i - 1];
                }
              }
              if (
                !reqObj.aadharNumber
                &&
                currentWordsLine
                &&
                currentWordsLine.length > 12
              ) {
                // check for aadhar number.
                if (
                  currentWordsLine.length == 14
                  &&
                  currentWordsLine.split(' ').length == 3
                  &&
                  currentWordsLine.split(' ')[0].length == 4
                  &&
                  currentWordsLine.split(' ')[1].length == 4
                  &&
                  currentWordsLine.split(' ')[1].length == 4
                ) {
                  reqObj.aadharNumber = currentWordsLine;
                }
              }
            }

            if(
              reqObj.aadharNumber
              &&
              reqObj.gender
              &&
              reqObj.dob
              &&
              reqObj.name
            ){
              reqObj.doesAllValueFound = true;
            }
            console.log('reqObj****', reqObj);
            return reqObj;
          }

          let getPanData = function (linesArray: any): any {
            console.log('INIT getPanData***', linesArray, linesArray.length);
            var reqObj: any = { name: null, fatherName: null, panNumber: null, dob: null, doesAllValueFound : false };
            var indexOfLineContainsINDIA , indexOfLineContainsNUMBER;
            for (var i = 0; i <= linesArray.length - 1; i++) {
              if(
                (linesArray[i].replace(/ /g, ''))
                &&
                (
                  (linesArray[i].toLowerCase()).indexOf('india') != -1
                  ||
                  (linesArray[i].toLowerCase()).indexOf('income') != -1
                  ||
                  (linesArray[i].toLowerCase()).indexOf('department') != -1
                  ||
                  (linesArray[i].toLowerCase()).indexOf('tax') != -1
                )
              ){
                indexOfLineContainsINDIA = i;
                // console.log('indexOfLineContainsINDIA***',indexOfLineContainsINDIA);
              }
                  if (
                    indexOfLineContainsINDIA
                    &&
                    i >= indexOfLineContainsINDIA+1
                    &&
                    !reqObj.name
                    &&
                    (linesArray[i].replace(/ /g, ''))
                    &&
                    (linesArray[i].replace(/ /g, '')).length > 0
                  ) {  
                      reqObj.name = linesArray[i];
                  }

                  if (
                    indexOfLineContainsINDIA
                    &&
                    i > indexOfLineContainsINDIA+1
                    &&
                    reqObj.name
                    &&
                    reqObj.name != linesArray[i]
                    &&
                    !reqObj.fatherName
                    &&
                    (linesArray[i].replace(/ /g, ''))
                    &&
                    (linesArray[i].replace(/ /g, '')).length > 0
                  ) {
                    reqObj.fatherName = linesArray[i];
                  }

                  if (
                    linesArray[i]
                    &&
                    (linesArray[i].toLowerCase()).indexOf('number') != -1
                  ) {
                      indexOfLineContainsNUMBER = i;

                      !reqObj.dob && linesArray[i - 1] ? reqObj.dob = linesArray[i - 1] : '';
                      !reqObj.dob && linesArray[i - 2] ? reqObj.dob = linesArray[i - 2] : '';
                      !reqObj.dob && linesArray[i - 3] ? reqObj.dob = linesArray[i - 3] : '';
                  }

                  if (
                    indexOfLineContainsNUMBER
                    &&
                    i > indexOfLineContainsNUMBER+1
                    &&
                    reqObj.dob
                    &&
                    !reqObj.panNumber
                    &&
                    linesArray[i]
                    &&
                    linesArray[i].length >= 10
                  ) {
                    reqObj.panNumber = linesArray[i];
                  }
            }

            if(
              reqObj.name
              &&
              reqObj.fatherName
              &&
              reqObj.panNumber
              &&
              reqObj.dob
            ){
              reqObj.doesAllValueFound = true;
            }

            console.log('reqObj***',reqObj);
            return reqObj;
          }

          let linesArray = data.split('\n');
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
              responseObj = this.getPassportData(linesArray);
              break;
            case 'drivinglicence':
              responseObj = this.getDrivingLicenceData(linesArray);
              break;
            case 'check':
            case 'cancelcheck':
              responseObj = this.getCheckData(linesArray);
              break;
            default:
              responseObj = this.invalidFileData(linesArray);
              break;
          }
          if(
            responseObj.doesAllValueFound
          ){
            res.status(HttpStatus.OK).json({
              status: "OK",
              message: "OK",
              result: responseObj
            });
          }else{
            res.status(HttpStatus.BAD_REQUEST).json({
              status: "BAD_REQUEST",
              message: 'Not getting values from uploaded '+fileType+'. It can be invalid file. Please check and upload again.';
            });
          }
        });

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
