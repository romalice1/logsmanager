var payloadCheck = require('payload-validator');
var mysql = require("../connection");

// Log Model
class Log{
    // Create a new log
    static create(data, callback){
        // Validating the payload
        var payload = this.payloadValidator(data)
        if( payload.success){
            // Open mysql connection
            var conn = mysql.connect()
            //Make query
            conn.query(this.insertQuery(data), (err, todos, fields)=>{
                if(err){
                    callback('An error occurred while executing the query: '+err.message);
                }
                callback({message:"Log recorded successfully"})
            })
            // Close mysql connection
            conn.end()
        }else{
            //Callback when payload is invalid
            callback( payload.response.errorMessage )
        }
    }

    static findAll(data, callback){
        var conn = mysql.connect()
        //Make query
        conn.query("SELECT log.*, application.application_name  FROM log, application WHERE log.application_id=application.application_id", (err, todos, fields)=>{
            if(err){
                callback({message:'Error: '+err.message});
            }
            callback({data:todos, message:"Success"})
        })
        // Close mysql connection
        conn.end()
    }

    static findOne(){}

    // Validating the payload
    static payloadValidator(incomingdata){
        var expected = {
            "application_id":"",
            "called_api":"",
            "error_status":"",
            "error_message":""
        }
        //(incoming,target,amandatoryFields[],blank value flag)
        return payloadCheck.validator(incomingdata, expected, ["application_id","called_api","error_message"], true);
    }

    static insertQuery(data){
        return "INSERT INTO log (application_id,called_api,error_status,error_message)"+ 
            "VALUES ('"+data.application_id+"','"+data.called_api+"','"+data.error_status+"','"+data.error_message+"')";
    }
}

module.exports = Log

/*
// --- creating table log --- //
CREATE TABLE IF NOT EXISTS log(
    date timestamp,
    application_id VARCHAR(200) NOT NULL,
    called_api VARCHAR(200) NOT NULL,
    error_status VARCHAR(3) NOT NULL,
    error_message VARCHAR(200) NOT NULL
);*/