// server.js
var port = process.env.PORT || 8080;

// require packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// routing
var api        = require('./routes/api.js');
var index      = require('./routes/index.js');

// middleware
app.use("/public", express.static(__dirname + "/build"));
app.use("/data", express.static(__dirname + "/data"));
app.use("/code", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
app.use('/', index);
app.use('/api', api);

// start
app.listen(port);

console.log('Server started on port ' + port);
