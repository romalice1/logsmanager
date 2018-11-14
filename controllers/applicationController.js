app = require("../model/application");

class ApplicationController {
    static create(req, res){
        app.create(req.body, function(result){
            res.json(result)
        })
    }
    static findAll(req, res){
        app.findAll(req.body, function(result){
            res.json(result)
        })
    }
}

module.exports = ApplicationController;