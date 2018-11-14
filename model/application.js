var payloadCheck = require('payload-validator');
var mysql = require("../connection");

class Application{
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
                callback({message:"New application recorded successfully"})
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
        conn.query("SELECT * FROM application", (err, todos, fields)=>{
            if(err){
                callback({message:'Error: '+err.message});
            }
            callback({data:todos, message:"Success"})
        })
        // Close mysql connection
        conn.end()
    }

    /** Helper Functions */
     // Validating the payload
     static payloadValidator(incomingdata){
        var expected = {
            "application_name":"",
        }
        //(incoming,target,amandatoryFields[],blank value flag)
        return payloadCheck.validator(incomingdata, expected, ["application_name"], true);
    }
    // Qerry buider
    static insertQuery(data){
        //Generate application_id
        var application_id = this.generateId()
        return "INSERT INTO application (application_id,application_name) VALUES('"+application_id+"','"+data.application_name+"')";
    }

    //Generate ID
    static generateId(){
        var md5 = require('md5');
        return md5(new Date()).substring( 0,29 ) //Returns 30 characters
    }
    /** END Helper Functions */
}

module.exports = Application

/*
// -- creating table application -- //
CREATE TABLE IF NOT EXISTS application(
    application_id VARCHAR(200) NOT NULL UNIQUE,
    application_name VARCHAR(200) NOT NULL,
    date_created timestamp
);
*/