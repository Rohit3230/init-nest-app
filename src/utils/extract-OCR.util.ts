export const getCheckData = function(linesArray: any): any {
    console.log('INIT util fun getCheckData***', linesArray);
    let reqObj : any = {ifsc:null, accNum:null, bankName:null};
    for(var i = 0; i<= linesArray.length-1;i++){
      if(
        (linesArray[i].toLowerCase()).indexOf('ifsc') != -1
      ){
          var ifscData = linesArray[i].split('IFSC : ');
          reqObj.ifsc = ifscData[1].split(' ')[0];
      }
      if(
        (linesArray[i].toLowerCase()).indexOf('bank') != -1
      ){
          reqObj.bankName = linesArray[i];
      }
    }
    console.log('reqObj***',reqObj);
    return reqObj;
  };

  export const  getAadharData = function (linesArray: any): any {
    console.log('INIT getAadharData***', linesArray);
    // let linesArray = fileString.split('\n');
    // console.log('linesArray**', linesArray);
    let reqObj: any = {
      aadharNumber: null,
      gender: null,
      dob: null,
      name: null
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

    console.log('reqObj****', reqObj);
    return reqObj;
  }

  export const  getPanData = function (linesArray: any): any {
    console.log('INIT getPanData***', linesArray, linesArray.length);
    var reqObj: any = { name: null, fatherName: null, panNumber: null, dob: null };
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

    console.log('reqObj***',reqObj);
    return reqObj;
  } 

  export const  getPassportData = function(linesArray: any): any {
    console.log('INIT getPassportData***', linesArray);
    let reqObj : any = {ifsc:null, accNum:null, bankName:null};
    console.log('reqObj***',reqObj);
    return reqObj;
  }

  export const  getDrivingLicenceData = function(linesArray: any): any {
    console.log('INIT getDrivingLicenceData***', linesArray);
    let reqObj : any = {ifsc:null, accNum:null, bankName:null};
    console.log('reqObj***',reqObj);
    return reqObj;
  }

  export const validatedExtractedData = function(reqObj:any){
    console.log('INIT validatedExtractedData**1**', reqObj);

    (Object.keys(reqObj)).forEach(function(keyName){
      if(
        !reqObj[keyName]
      ){
        reqObj.isValidated = false;
      }
    });

    console.log('isValidated***',(reqObj).hasOwnProperty('isValidated'));

    if(
      (reqObj).hasOwnProperty('isValidated') == false
    ){
      reqObj.isValidated = true;
    }

    console.log('INIT validatedExtractedData**2**', reqObj);
    return reqObj;
  }