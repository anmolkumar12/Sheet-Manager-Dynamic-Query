const fs = require('fs')
const path = require('path')
const appRoot = require('app-root-path')

const logging_data = async (user,body,result)=>{
    try {
        fs.appendFileSync(path.join(appRoot.path,'logs',`logs-${new Date().toDateString()}.txt`),`${new Date().getTime()}-Time =====> ${user}-User ======>  ${body}-body ====> ${result}-result \n`)
        console.log(user,body,result,"Logged")
    } catch (error) {
        throw Error('Something Went Wrong in logging',error)
    }
}

module.exports = {logging_data};