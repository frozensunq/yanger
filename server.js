#!/usr/bin/env node

var port = 8080;
var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var exec = require('child_process').exec

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.post("/yang_process", function(req, res)
{
	// TODO: make in unique folder for user - file name has to match yang module statement
	var file_name = '/tmp/' + req.body.yang_module_name + '.yang'

	var file_content = req.body.yang_module_content

	console.log(file_name + " " + file_content)
	fs.writeFile(file_name, file_content, function (error)
	{
		if (error)
		{
			return res.end('{"error": "' + error + '"}')
		}

		exec('pyang -f yang ' + file_name, function(error, stdout, stderr)
		{
			var response = {}
			response.error = error || stderr
			response.yang = stdout

			res.end(JSON.stringify(response))
		})
	});

})

app.listen(port)
console.log('Listening on port: ' + port);
