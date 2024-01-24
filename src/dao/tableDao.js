
const { Op, or } = require("sequelize");
const { exceptions } = require("../core");
// const Models = require("../models");
const { database } = require("../config/dbConfig");
const { STATUS, ROLES } = require("../constants");
const messages = require("../messages");
// const userDao = require("./userDao");
const { redis } = require("../utils");
const { param } = require("../routes/tableRoute");
const tableDao = {};
const sql = require('mssql')
//---------------------------- *MASTER GET OPERATIONS* ---------------------------------

// get table Column
tableDao.getTableColumns = async (body) => {
    let query = `select top 1 * from ${body.sheetName}`;
    try {
        return await database.poolPromise().then(async pool => {
            return await pool.request().query(query).then(async result => {
                return result.recordset;
            }).catch(err => {
                return {
                    state: -1,
                    message: "Failed while getting data from MSSERVER database!",
                    error: err
                }
            });
        }).catch(err => {
            return {
                state: -1,
                message: "Failed while connecting to MSSERVER database!",
                error: err
            }
        })

    } catch (err) {
        return {
            state: -1,
            message: "Something went wrong while connecting to MSSERVER database!",
            error: err
        }
    }
}

// Get the list of all the sheets
tableDao.getTableData = async (body) => {
    let query = `SELECT * FROM ${body.sheetName}`;
    try {
        return await database.poolPromise().then(async pool => {
            return await pool.request().query(query).then(async result => {
                return result.recordset;
            }).catch(err => {
                return {
                    state: -1,
                    message: "Failed while getting data from MSSERVER database!",
                    error: err
                }
            });
        }).catch(err => {
            return {
                state: -1,
                message: "Failed while connecting to MSSERVER database!",
                error: err
            }
        })

    } catch (err) {
        return {
            state: -1,
            message: "Something went wrong while connecting to MSSERVER database!",
            error: err
        }
    }
}

// update record in a table
tableDao.updateTableRecord = async (body) => {
    const tableName = body.sheetName;
    const updateDataArray = JSON.parse(body.updateDataArray);
    const conditionColumn = body.conditionColumn;
    try {
        return await database.poolPromise().then(async pool => {
            const request = pool.request();
            for (const updateInfo of updateDataArray) {
                const updateQuery = `
                    UPDATE ${tableName}
                    SET {{columns}}
                    WHERE ${conditionColumn} = ${updateInfo.conditionValue}
                  `;
                const columnUpdates = Object.keys(updateInfo.data)
                    .map((column) => `"${column}" = '${updateInfo.data[column]}'`)
                    .join(', ');
                const query = updateQuery.replace('{{columns}}', columnUpdates);
                request.input('conditionValue', sql.NVarChar, updateInfo.conditionValue);
                for (const column in updateInfo.data) {
                    const parameterName = column.replace(/\s+/g, '_'); // Replace spaces with underscores
                    request.input(parameterName, sql.NVarChar, updateInfo.data[column]);
                }
                return await pool.request().query(query).then(async result => {
                    console.log("--------------------------result-------------------------", result)
                    return result.recordset;
                }).catch(err => {
                    return {
                        state: -1,
                        message: "Failed while getting data from MSSERVER database!",
                        error: err
                    }
                });
            }
        }).catch(err => {
            return {
                state: -1,
                message: "Failed while connecting to MSSERVER database!",
                error: err
            }
        })

    } catch (err) {
        return {
            state: -1,
            message: "Something went wrong while connecting to MSSERVER database!",
            error: err
        }
    }
}




// create a new record in a table
// tableDao.createTableRecord = async (body) => {
//     try {
//         let obj = JSON.parse(JSON.stringify(body))
//         delete obj.sheetName;
//         return await Models[tables[body.sheetName]].create(body);
//     } catch (error) {
//         throw error;
//     }
// }

tableDao.createTableRecord = async (body) => {
    console.log("-----------------body--------------------",body);
    const tableName = body.sheetName;
    const insertDataArray = JSON.parse(body.insertDataArray);

    try {
        return await database.poolPromise().then(async pool => {
            const request = pool.request();
            for (const insertInfo of insertDataArray) {
                const columns = Object.keys(insertInfo.data).map(value => `[${value}]`).join(', ');
                const values = Object.values(insertInfo.data)
                    .map(value => `'${value}'`)
                    .join(', ');

                const insertQuery = `
                    INSERT INTO ${tableName} (${columns})
                    VALUES (${values});
                `;

                for (const column in insertInfo.data) {
                    const parameterName = column.replace(/\s+/g, '_'); // Replace spaces with underscores
                    request.input(parameterName, sql.NVarChar, insertInfo.data[column]);
                }
               console.log("testing",insertQuery)
                return await pool.request().query(insertQuery).then(async result => {
                    console.log("------------------result.recordset------------------", result.recordset)
                    return result;
                }).catch(err => {
                    console.log("errrorrrrrrrrrrrrrr", err)
                    return {
                        state: -1,
                        message: "Failed while inserting data into MSSERVER database!",
                        error: err
                    }
                });
                // return await pool.request().query(insertQuery).then(async result => {
                //     return result.recordset;
                // }).catch(err => {
                //     return {
                //         state: -1,
                //         message: "Failed while getting data from MSSERVER database!",
                //         error: err
                //     }
                // });
            }
        }).catch(err => {
            console.log("-------------------------------update---------------------------------")
            return {
                state: -1,
                message: "Failed while connecting to MSSERVER database!",
                error: err.toString()
            }
        })

    } catch (err) {
        return {
            state: -1,
            message: "Something went wrong while connecting to MSSERVER database!",
            error: err
        }
    }
}


module.exports = tableDao;
