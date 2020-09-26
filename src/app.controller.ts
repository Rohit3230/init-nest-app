import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';
import { AppService } from './app.service';
// import { extname } from 'path';
var fs = require('fs');
const tesseract = require("node-tesseract-ocr");
// var process = require('process');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
  @Post(:type)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    console.log('file****',file);
    let response : any;
    if(
      file
      &&
      file.originalname
    ){
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

      let callMe = async function(){
          const result = await tesseract.recognize(reqFileNameForOCR, config);
            console.log('callMe function:- result:- ', result);

            var data = '';

            var readStream = fs.createReadStream('stdout.txt', 'utf8');

            readStream.on('data', function(chunk) {
                data += chunk;
            }).on('end', function() {
                console.log('file data***',data);
            });

      }
    
    callMe()
    .then(result=> console.log('then result***',result))
    .catch(error=> console.log('catch error***',error));

    }else{
      response = {
        originalname: 'Not Found.',
        filename: 'Not Found',
      };
    }

    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }


  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }


}
