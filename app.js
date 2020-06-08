var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const indexRoute = require('./routers/index')(app);
var PORT = 3000;

var options = { //specify options
    host: `localhost:${PORT}`
}

//USE AS MIDDLEWARE
app.use(bodyParser.json()); // add body parser

app.listen(PORT, ()=> {
    console.log('started');
});