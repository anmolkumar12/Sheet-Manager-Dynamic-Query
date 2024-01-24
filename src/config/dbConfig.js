
//= ================================== Load Modules start ===================================

//= ================================== Load external modules=================================

// const logger = require("_/logger").logger;
const config = require("./config");
const redis = require("redis");
const sql = require('mssql')
//= ================================== Load Modules end =====================================

const client = redis.createClient(config.redisDb.port, config.redisDb.host);

client.on('connect', function () {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

const host = "psslazuresql.database.windows.net";
const user_name = "psslazuresa";
const password = "Polestar@2024#";
const database_name = "master_portal_uat";
const instance_name = "MSSQLSERVER01";
const port = 1433;

const dbConfig = {
  user: user_name,
  password: password,
  server: host,
  database: database_name,
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: instance_name,
  },
  port: port,
};


database = {
  poolPromise: () => {
    return new sql.ConnectionPool(dbConfig).connect()
      .then(pool => {
        return pool;
      })
      .catch(err => {
        return {
          state: -1,
          message: "Failed to connect to database",
          error: err.originalError.message
        }
      });
  }
};
module.exports = {
  client,
  database
};
