/* Initial declarations */
var express = require("express");
var app = express();
var server = require('http').createServer(app);

var bodyParser = require("body-parser");
var path  = require('path');

/** Body parser middleware **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/** set static path **/
app.use(express.static(path.join(__dirname, 'public')));

/************* Routes *****************/
var routes = require('./routes');
app.use('/api', routes)
app.use( redirectUnmatched )
// Redirect unmateched routes
function redirectUnmatched(req, res) {
    res.redirect("/api/log");
}
/**************************************/

server.listen(4000, function(){
	console.log('Server started on port 4000...');
});