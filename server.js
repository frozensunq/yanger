#!/usr/bin/env node

var port = 8080;
var express = require('express')
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.listen(port)
console.log('Listening on port: ' + port);
