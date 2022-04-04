
const mysql = require('mysql2');
let excelToJson =   require('./excelToJson');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'db_images'
});

/**
 *
 * @param req
 * @param res
 */
function getAppInfo(req, res) {
    let appPackage = require('./package.json');
    let info = {
        name: appPackage.name,
        version: appPackage.version,
        description: appPackage.description
    };
    res.status(200).send(info);
}

/**
 *
 * @param req
 * @param res
 */
function readData(req, res) {

    var value;
    connection.execute(
        'SELECT * FROM images order by WIN desc',
        function(err, results, fields) {
            console.log(results);
            value = prepareData(results);
            res.status(200).send(value);
        }
    );
}

/**
 *
 * @param data
 * @returns {[]}
 */
function prepareData(data){
    var value = [], images;
    for(var i =0; i < data.length; i++){
        var obj = {};
        for (let j in data[i]) {
            if(j === 'IMAGES'){

                images = data[i][j].split(';');
                obj[j] = images;

            } else {
                obj[j] = data[i][j];
            }

        }
        value.push(obj);
    }
    return value;
}

/**
 *
 * @param req
 * @param res
 */
function uploadData(req, res){
    let data = excelToJson.getConvertedJson(req);
    if(Array.isArray(data) && data.length <= 100) {
        connection.execute(
            'call sp_import_data(?)',
            [JSON.stringify(data)],
            function () {
                res.send(data);
            },
            function (error) {
                res.send(error);
                console.log(error);
            });
    } else {
        res.send(data.length > 100 ? 'can take only 100 records' : data);
    }

}
module.exports = {
    getAppInfo,
    readData,
    uploadData
}
