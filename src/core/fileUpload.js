const path = require('path');
const appRoot = require('app-root-path');
const fs = require('fs');
const async = require('async');


var uploadFile = {};

uploadFile.UploadFile = async (files,path1) =>{
    return new Promise((resolve,reject)=>{
        try {
            var checkdir = path.join(appRoot.path,path1);
        if (!fs.existsSync(checkdir)) {
            fs.mkdirSync(checkdir, 0777);
        }
        var filesUploaded=[];
        console.log(files,"files uploaded")
        files = files['file'].length > 1 ? files['file'] : [files.file];  
        async.times(files.length,(n,next)=>{
            var sampleFile = files[n];
            console.log(sampleFile,"this is sample file")
            if (sampleFile) {
                let filepath1 = path.join(checkdir, sampleFile.name)
                sampleFile.mv(filepath1, (err) => {
                    if (!err) {
                        filesUploaded.push({
                            filename: sampleFile.name,
                            filepath: filepath1,
                        });
                    }
                    next(null, 'success');
                })
            } else {
                next(null, 'success');
            }
        },(err,result)=>{
            if(err){
                reject(err);
            }else{
                console.log(filesUploaded,"filesUploaded");
                resolve(filesUploaded);
            }
        })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = uploadFile;


