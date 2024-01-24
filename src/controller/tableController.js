const tableDao = require("../dao/tableDao");
const exceptions = require("../core/customExceptions");
const messages = require("../messages")
const XLSX = require('xlsx');
const tableController = {};

tableController.updateTableRecord = async (body) => {
    try {
        await tableDao.updateTableRecord(body)
    } catch (error) {
        throw error;
    }
    return messages.recordUpdated;
}

tableController.createTableRecord = async (body) => {
    try {
        await tableDao.createTableRecord(body)
    } catch (error) {
        console.log("adadasda");
        throw error;
    }
    return messages.recordCreated;
}


tableController.getTableData = async (body) => {
    try {
        const tableColumns = await tableDao.getTableColumns(body);
        const columnName = Object.keys(tableColumns[0]);
        const tableData = await tableDao.getTableData(body)
        return {
            columns: columnName,
            data: tableData
        };
    } catch (e) {
        throw exceptions.badRequestError(messages.invalidRequest);
    }
}



// tableController.getExportTableData = async (body) => {
//     try {        
//             const tableData = await tableDao.getTableData(body)
//             // Create a new workbook and worksheet    
//             const workbook = XLSX.utils.book_new();
//             const worksheet = XLSX.utils.json_to_sheet(tableData);
//             // Add the worksheet to the workbook
//             XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

//            // Save the workbook as an Excel file
//              const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
//         return excelBuffer;
//     } catch(e) {
//         throw exceptions.badRequestError(messages.invalidRequest);
//     }
// }

module.exports = tableController;
