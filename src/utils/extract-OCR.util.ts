// let isEveryCharOfStringIsDigit = function(charString:string) {
//   console.log('INIT isEveryCharOfStringIsDigit****');
//   return true;
//   // for(var i=0; i<= charString.length-1 ; i++){
//   // }
// }

let doesStringContainingAnyDate = function(reqString){
  console.log('INIT doesStringContainingAnyDate****', reqString);
  var splitBySpace = reqString.split(' ');
  let dateString:string;
  for(var i=0; i<= splitBySpace.length-1; i++){
    if(
      splitBySpace[i]
      &&
      splitBySpace[i].indexOf('/') != -1
      &&
      splitBySpace[i].split('/').length == 3
    ){
      dateString = splitBySpace[i];
    }
  }
  console.log('Result doesStringContainingAnyDate****', dateString);
  return dateString;
}

let removeAllSpecialCharsFromSting = function (reqString: string) {
  // console.log('INIT removeAllSpecialCharsFromSting***', reqString, typeof(reqString));
  // reqString = reqString.replace(/['"\u005F\u005B\u005D\u003B\u002C\u002C\u0040\u0026\u2122\u00ae\u007E\u0021\u0023\u0024\u0025\u002A\u005E\u0028\u0029\u002B\u007B\u007D\u003A\u003F\u003C\u003E\u201D\u201C]/g, '');
  // reqString = reqString.replace(/ /g, '');
  reqString = reqString.replace(/[^a-zA-Z0-9]/g, '');
  reqString = reqString.replace(/[&\/\\#,+()$~%.'":*?<>{}_]/g, '');
  return reqString;
}


export const getCheckData = function (linesArray: any): any {
  console.log('INIT util fun getCheckData***', linesArray);
  let reqObj: any = { ifsc: null, accNum: null, bankName: null };
  for (var i = 0; i <= linesArray.length - 1; i++) {
    if (
      !reqObj.ifsc
      &&
      //(
      (linesArray[i].toLowerCase()).indexOf('ifsc') != -1
      // ||
      // (linesArray[i].toLowerCase()).indexOf('fsc') != -1
      //)
    ) {
      // console.log('linesArray[i].replace****',linesArray[i].replace(/ /g, ''))
      //   var ifscData = (linesArray[i].replace(/ /g, '')).split('IFSC:');
      //   console.log('ifscData***',ifscData);
      //   ifscData && ifscData[1] ? reqObj.ifsc = ifscData[1].split(' ')[0] : '';
      console.log('linesArray[i].replace****', linesArray[i])
      // var ifscData = linesArray[i].split(' ');
      var ifscStrIndex = 0;
      for (var j = 0; j <= linesArray[i].split(' ').length - 1; j++) {
        // console.log('sss**',linesArray[i].split(' ')[j]);
        if (
          ((linesArray[i].split(' ')[j]).toLowerCase()).indexOf('ifsc')
        ) {
          ifscStrIndex = j;
        }
        if (
          ifscStrIndex
          &&
          j + 1 > ifscStrIndex
          &&
          linesArray[i].split(' ')[j].length
          &&
          linesArray[i].split(' ')[j].length > 5
          &&
          (linesArray[i].split(' ')[j]).indexOf('YYY') == -1
        ) {
          reqObj.ifsc = linesArray[i].split(' ')[j];
        }
      }
      // console.log('ifscData***',ifscData);
      // ifscData && ifscData[1] ? reqObj.ifsc = ifscData[1].split(' ')[0] : '';
    }

    if (
      !reqObj.bankName
      &&
      (linesArray[i].toLowerCase()).indexOf('bank') != -1
    ) {
      reqObj.bankName = linesArray[i];
    }


    //console.log('linesArray[i]****', linesArray[i] , linesArray[i].length);
    if (
      !reqObj.accNum
      &&
      linesArray[i]
      &&
      (linesArray[i]).length > 9
    ) {
      //console.log('(linesArray[i]).split(' ')***',(linesArray[i]).split(' '),  (linesArray[i]).split(' ').length);
      for (var j = 0; j <= (linesArray[i]).split(' ').length - 1; j++) {
        //console.log('(linesArray[i]).split(' ')[j]***',(linesArray[i]).split(' ')[j], (linesArray[i]).split(' ')[j].length, !isNaN(Number((linesArray[i]).split(' ')[j])));
        if (
          ((linesArray[i]).split(' ')[j]).length >= 9
          &&
          ((linesArray[i]).split(' ')[j]).length <= 18
          &&
          !isNaN(Number((linesArray[i]).split(' ')[j]))
          &&
          !reqObj.accNum
        ) {
          reqObj.accNum = (linesArray[i]).split(' ')[j];
        }
      }
    }
  }
  console.log('reqObj***', reqObj);
  return reqObj;
};

export const getAadharData = function (linesArray: any): any {
  console.log('INIT getAadharData***', linesArray);

  let reqObj: any = {
    aadharNumber: null,
    gender: null,
    dob: null,
    name: null,
    address: null
  };
  var addressContainingStrInd: number;
  var fullImgAddressContainingStrInd: number;
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

        if (
          reqObj.dob
          // &&
          // reqObj.gender
          &&
          !reqObj.name
        ) {
          // console.log(linesArray[i - 1],'***',linesArray[i - 2],'***',linesArray[i - 3]);
          !reqObj.name && linesArray[i - 1] && (linesArray[i - 1]).replace(/ /g, '') != '' ? reqObj.name = linesArray[i - 1] : '';
          !reqObj.name && linesArray[i - 2] && (linesArray[i - 2]).replace(/ /g, '') != '' ? reqObj.name = linesArray[i - 2] : '';
          !reqObj.name && linesArray[i - 3] && (linesArray[i - 3]).replace(/ /g, '') != '' ? reqObj.name = linesArray[i - 3] : '';
        }
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
    }
    if (
      !reqObj.aadharNumber
      &&
      currentWordsLine
      &&
      currentWordsLine.length > 12
    ) {
      // check for aadhar number.
      // var accNumContainStringArr = currentWordsLine.split(' ');
      // console.log('currentWordsLine***',currentWordsLine);
      var iteration = 0;
      var adharNumString = '';
      for (var j = 0; j <= currentWordsLine.split(' ').length - 1; j++) {

        var reqAadharStr = currentWordsLine.split(' ')[j];
        reqAadharStr = removeAllSpecialCharsFromSting(reqAadharStr);

        if (
          reqAadharStr
          &&
          reqAadharStr.length
          &&
          reqAadharStr.length == 4
          &&
          !isNaN(reqAadharStr)
        ) {
          iteration = iteration + 1;
          adharNumString = adharNumString + (adharNumString ? ' ' : '') + reqAadharStr
        } else {
          if (
            iteration != 3
          ) {
            iteration = 0;
            adharNumString = '';
          }
        }
      }
      if (
        iteration = 3
      ) {
        reqObj.aadharNumber = adharNumString;
      }
    }

    if (
      !reqObj.address
      &&
      !addressContainingStrInd
      &&
      (currentWordsLine.toLowerCase()).indexOf('address') != -1
    ) {
      addressContainingStrInd = i;
      console.log('addressContainingStrInd***', addressContainingStrInd);
    }
    if (
      (
        addressContainingStrInd
        ||
        addressContainingStrInd == 0
      )
      &&
      i >= addressContainingStrInd + 1
      // &&
      // !reqObj.address
    ) {
      // !reqObj.address ? reqObj.address = '' : '';
      if (
        currentWordsLine
        &&
        (currentWordsLine.replace(/ /g, '')).length
      ) {
        reqObj.address = (reqObj.address ? reqObj.address + '\n' : '') + '' + currentWordsLine;
      }

      // console.log('currentWordsLine***',currentWordsLine, currentWordsLine.length, removeAllSpecialCharsFromSting(currentWordsLine).length);

      if (
        currentWordsLine
        &&
        currentWordsLine.length
        &&
        (
          currentWordsLine.length == 6
          ||
          removeAllSpecialCharsFromSting(currentWordsLine).length == 12
        )
      ) {
        addressContainingStrInd = 10000;
      }
    }


    if (
      !reqObj.address
      &&
      !addressContainingStrInd
      &&
      !fullImgAddressContainingStrInd
      &&
      (
        currentWordsLine
        &&
        currentWordsLine == 'To'
      )
    ) {
      fullImgAddressContainingStrInd = i;
    }
    // console.log('fullImgAddressContainingStrInd***',fullImgAddressContainingStrInd);
    if (
      fullImgAddressContainingStrInd
      &&
      i >= fullImgAddressContainingStrInd + 1
    ) {
      if (
        currentWordsLine
        &&
        (currentWordsLine.replace(/ /g, '')).length
        // &&
        // (currentWordsLine.replace(/ /g, '')).length != 10
      ) {
        reqObj.address = (reqObj.address ? reqObj.address + '\n' : '') + '' + currentWordsLine;

        currentWordsLine = removeAllSpecialCharsFromSting(currentWordsLine);
        if (
          !isNaN(currentWordsLine)
          &&
          currentWordsLine.length == 10
        ) {
          fullImgAddressContainingStrInd = 0;
        }
      }

    }
    // console.log('fullImgAddressContainingStrInd****',fullImgAddressContainingStrInd);
  }

  console.log('reqObj****', reqObj);
  return reqObj;
}

export const getPanData = function (linesArray: any): any {
  console.log('INIT getPanData***', linesArray, linesArray.length);
  var reqObj: any = { name: null, fatherName: null, panNumber: null, dob: null };
  var indexOfLineContainsINDIA, dobLineIndex, indexOfLineContainsNUMBER;
  for (var i = 0; i <= linesArray.length - 1; i++) {
    // if(
    //   (linesArray[i].replace(/ /g, ''))
    //   &&
    //   (
    //     (linesArray[i].toLowerCase()).indexOf('india') != -1
    //     ||
    //     (linesArray[i].toLowerCase()).indexOf('income') != -1
    //     ||
    //     (linesArray[i].toLowerCase()).indexOf('department') != -1
    //     ||
    //     (linesArray[i].toLowerCase()).indexOf('tax') != -1
    //   )
    // ){
    //   indexOfLineContainsINDIA = i;
    // }
    // if (
    //   indexOfLineContainsINDIA
    //   &&
    //   i >= indexOfLineContainsINDIA+1
    //   &&
    //   !reqObj.name
    //   &&
    //   (linesArray[i].replace(/ /g, ''))
    //   &&
    //   (linesArray[i].replace(/ /g, '')).length > 0
    // ) {  
    //     reqObj.name = linesArray[i];
    // }

    // if (
    //   indexOfLineContainsINDIA
    //   &&
    //   i > indexOfLineContainsINDIA+1
    //   &&
    //   reqObj.name
    //   &&
    //   reqObj.name != linesArray[i]
    //   &&
    //   !reqObj.fatherName
    //   &&
    //   (linesArray[i].replace(/ /g, ''))
    //   &&
    //   (linesArray[i].replace(/ /g, '')).length > 0
    // ) {
    //   reqObj.fatherName = linesArray[i];
    // }

    if (
      linesArray[i]
      &&
      (linesArray[i].toLowerCase()).indexOf('number') != -1
    ) {
      indexOfLineContainsNUMBER = i;
      console.log('Check***',reqObj.dob,  doesStringContainingAnyDate(linesArray[i-1]));
      if (
        !reqObj.dob &&
        linesArray[i - 1] &&
        (removeAllSpecialCharsFromSting(linesArray[i-1])).length
        &&
        doesStringContainingAnyDate(linesArray[i-1])
        ) {
          console.log('****1****');
        reqObj.dob = linesArray[i - 1];
        dobLineIndex = i - 1;
      }
      if (
        !reqObj.dob &&
        linesArray[i - 2] &&
        (removeAllSpecialCharsFromSting(linesArray[i-2])).length > 7
        &&
        doesStringContainingAnyDate(linesArray[i-2])
        ) {
          console.log('****2****');
        reqObj.dob = linesArray[i - 2];
        dobLineIndex = i - 2;
      }
      if (
        !reqObj.dob &&
        linesArray[i - 3] &&
        (removeAllSpecialCharsFromSting(linesArray[i-3])).length > 7
        &&
        doesStringContainingAnyDate(linesArray[i-3])
        ) {
          console.log('****3****');
        reqObj.dob = linesArray[i - 3];
        dobLineIndex = i - 3;
      }
    }

    if(
      !reqObj.dob
      &&
      linesArray[i]
      &&
      (removeAllSpecialCharsFromSting(linesArray[i])).length > 7
      &&
      doesStringContainingAnyDate(linesArray[i])
      &&
      (linesArray[i+1].toLowerCase()).indexOf('number') == -1
      &&
      (linesArray[i+2].toLowerCase()).indexOf('number') == -1
      &&
      (linesArray[i+3].toLowerCase()).indexOf('number') == -1
    ){
      console.log('***4***')
      reqObj.dob = doesStringContainingAnyDate(linesArray[i]);
    }

    // if (
    //   !reqObj.dob &&
    //   linesArray[i] &&
    //   removeAllSpecialCharsFromSting(linesArray[i]) &&
    //   new Date(linesArray[i])
    // ) {
    //   reqObj.dob = linesArray[i];
    //   dobLineIndex = i;
    // }
    // console.log('dobLineIndex***',dobLineIndex, '***i****',i);
    console.log('dobLineIndex***',dobLineIndex);
    if (
      dobLineIndex
    ) {
      dobLineIndex = dobLineIndex - 1;
      do {
        // console.log('dobLineIndex***',dobLineIndex, '***Line Code***', linesArray[dobLineIndex]);
        if (
          !reqObj.fatherName
          &&
          (linesArray[dobLineIndex].replace(/ /g, ''))
          &&
          (linesArray[dobLineIndex].replace(/ /g, '')).length > 0
          &&
          linesArray[dobLineIndex]
        ) {
          reqObj.fatherName = linesArray[dobLineIndex];
        }
        if (
          reqObj.fatherName
          &&
          !reqObj.name
          &&
          (linesArray[dobLineIndex].replace(/ /g, ''))
          &&
          (linesArray[dobLineIndex].replace(/ /g, '')).length > 0
          &&
          linesArray[dobLineIndex]
          &&
          reqObj.fatherName != linesArray[dobLineIndex]
        ) {
          reqObj.name = linesArray[dobLineIndex];
        }
        dobLineIndex = dobLineIndex - 1;
      } while (dobLineIndex > 0)
    }

    // console.log('indexOfLineContainsNUMBER***',indexOfLineContainsNUMBER);
    if (
      indexOfLineContainsNUMBER
      &&
      i >= indexOfLineContainsNUMBER + 1
      // &&
      // reqObj.dob
      &&
      !reqObj.panNumber
      &&
      linesArray[i]
      &&
      linesArray[i].length >= 10
    ) {
      // var panNumString = (linesArray[i]).split(' ');
      for (var j = 0; j <= (linesArray[i]).split(' ').length - 1; j++) {
        if (
          !reqObj.panNumber
          &&
          (linesArray[i]).split(' ')[j]
          &&
          ((linesArray[i]).split(' ')[j]).length == 10
        ) {
          reqObj.panNumber = (linesArray[i]).split(' ')[j];
        }
      }
      // reqObj.panNumber = ;
    }

    if(
      // !reqObj.name
      // &&
      linesArray[i]
      &&
      (linesArray[i].toLowerCase()).indexOf("father's name") == -1
      &&
      (linesArray[i].toLowerCase()).indexOf("name") != -1
    ){
      reqObj.name = null;
      !reqObj.name && linesArray[i+1] && removeAllSpecialCharsFromSting(linesArray[i+1]) ? reqObj.name = linesArray[i+1] : '';
      !reqObj.name && linesArray[i+2] && removeAllSpecialCharsFromSting(linesArray[i+2]) ? reqObj.name = linesArray[i+2] : '';
      !reqObj.name && linesArray[i+3] && removeAllSpecialCharsFromSting(linesArray[i+3]) ? reqObj.name = linesArray[i+3] : '';
    }
    
    // console.log('linesArray[i]***',linesArray[i], (linesArray[i].toLowerCase()).indexOf("father"));
    if(
      // !reqObj.fatherName
      // &&
      linesArray[i]
      &&
      (
        (linesArray[i].toLowerCase()).indexOf("father's name") != -1
        ||
        (linesArray[i].toLowerCase()).indexOf("father") != -1
      )
    ){
      //console.log('is Father');
      reqObj.fatherName = null;
      !reqObj.fatherName && linesArray[i+1] && removeAllSpecialCharsFromSting(linesArray[i+1]) ? reqObj.fatherName = linesArray[i+1] : '';
      !reqObj.fatherName && linesArray[i+2] && removeAllSpecialCharsFromSting(linesArray[i+2]) ? reqObj.fatherName = linesArray[i+2] : '';
      !reqObj.fatherName && linesArray[i+3] && removeAllSpecialCharsFromSting(linesArray[i+3]) ? reqObj.fatherName = linesArray[i+3] : '';

      if(
        !reqObj.name
      ){
        !reqObj.name && linesArray[i-1] && removeAllSpecialCharsFromSting(linesArray[i-1]) ? reqObj.name = linesArray[i-1] : '';
        !reqObj.name && linesArray[i-2] && removeAllSpecialCharsFromSting(linesArray[i-2]) ? reqObj.name = linesArray[i-2] : '';
        !reqObj.name && linesArray[i-3] && removeAllSpecialCharsFromSting(linesArray[i-3]) ? reqObj.name = linesArray[i-3] : '';
      }
    }

    if(
      !reqObj.dob
      &&
      linesArray[i]
      &&
      (linesArray[i].toLowerCase()).indexOf("date of birth") != -1
    ){
      console.log('dob by check date of birth string.');
      !reqObj.dob && linesArray[i+1] && removeAllSpecialCharsFromSting(linesArray[i+1]) && new Date(linesArray[i+1]) ? reqObj.dob = linesArray[i+1] : '';
      !reqObj.dob && linesArray[i+2] && removeAllSpecialCharsFromSting(linesArray[i+2]) && new Date(linesArray[i+2]) ? reqObj.dob = linesArray[i+2] : '';
      !reqObj.dob && linesArray[i+3] && removeAllSpecialCharsFromSting(linesArray[i+3]) && new Date(linesArray[i+3]) ? reqObj.dob = linesArray[i+3] : '';
    }
  }

  console.log('reqObj***', reqObj);
  return reqObj;
}

export const getPassportData = function (linesArray: any): any {
  console.log('INIT getPassportData***', linesArray);
  let reqObj: any = { ifsc: null, accNum: null, bankName: null };
  console.log('reqObj***', reqObj);
  return reqObj;
}

export const getDrivingLicenceData = function (linesArray: any): any {
  console.log('INIT getDrivingLicenceData***', linesArray);
  let reqObj: any = { name: null, address: null, mobileNumber: null, dob:null, drivingLicenceNumber:null, issuedOn:null };
  console.log('reqObj***', reqObj);

  

  return reqObj;
}

export const validatedExtractedData = function (reqObj: any) {
  // console.log('INIT validatedExtractedData**1**', reqObj);

  (Object.keys(reqObj)).forEach(function (keyName) {
    if (
      !reqObj[keyName]
    ) {
      reqObj.isValidated = false;
    }
  });

  // console.log('isValidated***',(reqObj).hasOwnProperty('isValidated'));

  if (
    (reqObj).hasOwnProperty('isValidated') == false
  ) {
    reqObj.isValidated = true;
  }

  // console.log('INIT validatedExtractedData**2**', reqObj);
  return reqObj;
}