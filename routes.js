var express = require('express');
var logCtroller = require('./controllers/logController');
var appController = require( './controllers/applicationController' )

var router = express.Router();

router.route('/log')
    .get(logCtroller.findAll)
    .post(logCtroller.create)

router.route('/application')
    .post(appController.create)
    .get(appController.findAll)

module.exports = router;