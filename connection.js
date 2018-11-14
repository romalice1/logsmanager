const mysql = require('mysql');

class Mysql{
    static connect(){
        const options = {
            user: 'ots_logger',
            password: 'Oltranz@726!',
            database: 'OTS_LOGS'
        }
        return mysql.createConnection(options);
    }
}

module.exports = Mysql;