'use strict';

// Third-party packages to include.
const xlsx = require('xlsx');


/**
 * This function converts the excel file content to JSON data
 * @param req
 * @returns {*[]}
 */
function getConvertedJson(req) {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const json = xlsx.utils.sheet_to_json(worksheet);
    return validateData(json);
}

/**
 * checks if it has valid URL
 * @param userInput
 * @returns {boolean}
 */
function isInvalidUrlValid(userInput) {
    let res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null) {
        return true;
    }

}

/**
 * validates the received data from excel file
 * @param data
 * @returns {string|*}
 */
function validateData(data){
    let images = [], ids = [];


    for(let i =0; i < data.length; i++){

        for (let j in data[i]) {
            if(j === 'ID'){
                ids.push(data[i][j]);
            }
            else if(j === 'NAME' && data[i][j].length > 50){
                return 'Name contains more than 50 char'
            }
            else if(j === 'IMAGES'){

                images = data[i][j].split(';');
                if(images.length > 5){
                    return 'more than 5 images are not allowed in images column'
                } else {
                    for( let k = 0; k < images.length; k++){
                        if(isInvalidUrlValid(images[k])){
                            return 'Invalid Url';
                        }
                    }
                }
            }
            else if(j === 'WIN' && (data[i][j] < 0 || data[i][j] > 100)){
                return 'Win probability must be between 0 to 100'
            }
        }
    }
    if((new Set(ids)).size !== ids.length){
        return 'Ids has duplicate values'
    }
    return data;
}

module.exports = {
    getConvertedJson
};
