
const parse = require('xlsx-json-js');

let excelExport = {};

excelExport.bufferToJSON = async (data) =>{
    let k = parse.parse(data);
    let headers = k[0].data[0];
    let headerLength = k[0].data[0].length;
    let dataLength = k[0].data.length;
    let actualDataLength = dataLength -1;
    let jsonArr = [];
    for(let i = 1; i < dataLength ; i++){
        let obj = {};
        for(let j = 0;j<headerLength;j++){
            obj[`${headers[j]}`] = k[0].data[i][j] && k[0].data[i][j];
        }
        jsonArr.push(JSON.stringify(obj));
        obj = {};
    }
    jsonArr = [...new Set(jsonArr)];
    jsonArr = jsonArr.map(
        ele => JSON.parse(ele)
    )
    let RemovedRows = actualDataLength - jsonArr.length;
    return {
        data : jsonArr,
        Errored : RemovedRows
    };
}

module.exports = excelExport;