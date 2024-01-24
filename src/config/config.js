const dotenv = require("dotenv");
dotenv.config();

module.exports = {
 node_env:process.env.NODE_ENV,
 app_port: process.env.PORT,
 db:{
    name  : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialect:"mysql",
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
        multipleStatements: true
    },
    timezone: '+05:30' //for writing to database
 },
 redisDb: {
     redisIndex: process.env.REDIS_DB_INDEX,
     port: process.env.REDIS_DB_PORT,
     host: process.env.REDIS_DB_HOST
 },
 mailer : {
    from: `"SHEET-MANAGER-DLF"${process.env.MAIL_FROM}`,
    user: `${process.env.MAIL_FROM}`,
    pass: process.env.MAIL_SENDER_PASSWORD
    
  },
  helpdeskmail : process.env.HELPDESK_MAIL,
  mailto : `mailto:${process.env.HELPDESK_MAIL}`,
 JWT_SECRET_KEY: "MOMO",
 SSO_TOKEN_KEY: process.env.SSO_TOKEN_KEY,
 WEB_URL : process.env.WEB_CONFIG,
 SECRET_KEY : process.env.SECRET_KEY,
 CC_MAILS : process.env.CC_MAIL,
 SERVICE : process.env.SERVICE,
 usermail : process.env.MAIL_UserCreation,
 po_mail : process.env.PO_MAIL
};
