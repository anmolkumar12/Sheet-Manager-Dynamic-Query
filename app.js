const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const {app_port, node_env} = require("./src/config/config");
const db = require("./src/config/dbConfig");
const routes = require("./src/routes");
const { ROUTE_PREFIX } = require("./src/constants");
const fileUpload = require('express-fileupload');


const app = express();

app.use(express.json({ limit: 1024000 }));
// db.initConnection()
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(fileUpload())

let destination = path.join('./upload/file');

function makeDirectories(){
    if(!fs.existsSync(destination)){
        fs.mkdirSync(destination)
    }
    return destination;
}

let logoDir = path.join('./views/images')

function makeDirectories1(){
    if(!fs.existsSync(logoDir)){
        fs.mkdirSync(logoDir)
    }
    return logoDir;
}

app.use('/sheet-manager-dlf/v1',express.static(makeDirectories()));
app.use('/',express.static(makeDirectories1()));


// cronService.reminderCronJob();

// attach the routes to the app
require("./src/routes")(app);
// Routes
// app.use(ROUTE_PREFIX, routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    console.log("no route found for", req.url);
    res.status(404).send("Not Found")
});

app.listen(app_port, () => {
    console.log(`Express server listening on ${app_port}, in ${node_env} mode`);
  });