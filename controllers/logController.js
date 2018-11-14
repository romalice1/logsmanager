log = require("../model/log")

class LogController {
    static create(req, res){
        log.create(req.body, function(result){
            res.json(result)
        })
    }
    static findAll(req, res){
        log.findAll(req.body, function(result){
            res.json(result)
        })
    }
}

module.exports = LogController;