#!/usr/bin/env node

var port = 8080;
var yang_modules_dir = "/tmp/"
var leveldb_dir = __dirname + "/db/"

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var exec = require('child_process').execFile

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

var levelup = require('level')

var response = function(error, data)
{
	var resp = {}
	resp.error = typeof error === 'undefined' ? '' : error
	resp.data = typeof data === 'undefined' ? '' : data

	return JSON.stringify(resp)
}

/*
 * validate username, password (SHA256 hash)
 *
 */

function user_is_valid(username, userpass_hash)
{
	if (username.length < 4 ||
		username.length > 20 ||
		userpass_hash.length !== 64 ||
		new RegExp(/^[a-zA-Z0-9]+$/).test(username) === false ||
		new RegExp(/^[A-z0-9]{64}$/).test(userpass_hash) === false)
	{
		return false
	}

	return true
}

function uniq_n(username, userpass_hash)
{
	return username + "_" + userpass_hash
}
/*
 * check yang module name if matches identifier
 * https://tools.ietf.org/html/rfc6020#page-163
 *
 * client side and pyang will handle yang validation in more detail
 */

function identifier_valid(identifier)
{
	return new RegExp(/([A-z]|'_')+([A-z0-9]|\_|\-|\.)*/).test(identifier)
}

/*
 * save yang content to database for user
 */

app.put("/yang", function(req, res)
{
	var username = req.param('username')
	var userpass_hash = req.param('userpass_hash')

	var db = levelup(leveldb_dir + uniq_n(username, userpass_hash))

	db.put('name', 'LevelUP', function (error)
	{
		if (error)
		{
			db.close()

			return console.log('Ooops!', error) // some kind of I/O error
		}

		db.get('name', function (err, value)
		{
			db.close()

			if (err)
			{
				return console.log('Ooops!', err)
			}

			console.log('name=' + value)
		})
	})
})

/*
 * get yang content from database for user
 */

app.get("/yang/:username/:userpass_hash/:yang_module_name", function(req, res)
{
	var username = req.param('username')
	var userpass_hash = req.param('userpass_hash')
	var yang_module_name = req.param('yang_module_name')

	console.log("req username:" + username)
	console.log("req yang module name:" + yang_module_name)

	if (!user_is_valid(username, userpass_hash))
		return res.end(response("invalid username or password"))

	if (!identifier_valid(yang_module_name))
		return res.end(response("invalid yang module name"))

	var db = levelup(leveldb_dir + uniq_n(username, userpass_hash))

	db.get(yang_module_name, function(e, value)
	{
		db.close()

		if (e)
		{
			return res.end(response(e.toString()))
		}

		res.end(response(null, value))
	})
})

/*
 * create and validate yang module using pyang
 *
 * file name must match yang module name
 * we create directory per user and save modules there
 *
 */

app.post("/yang_process", function(req, res)
{
	var username = req.body.username
	var userpass_hash = req.body.userpass_hash
	var yang_module_name = req.body.yang_module_name
	var yang_module_content = req.body.yang_module_content

	if (!user_is_valid(username, userpass_hash))
		return res.end(response("invalid username or password"))

	if (!identifier_valid(yang_module_name))
		return res.end(response("invalid yang module name"))

	var dir_name = uniq_n(username, userpass_hash)
	if (dir_name.length > 254)
		dir_name = dir_name.substr(0, 254)

	dir_name = yang_modules_dir + dir_name
	dir_name += "/"

	fs.mkdir(dir_name, function(error)
	{
		if (error && error.code != 'EEXIST')
		{
			return res.end(response("unable to create directory:" + error.message))
		}

		var file_path = dir_name + yang_module_name + '.yang'

		console.log("file_path:" + file_path)

		fs.writeFile(file_path, yang_module_content, function (error)
		{
			if (error)
			{
				return res.end(response(error))
			}

			exec('pyang', ['-f', 'yang', file_path], function(error, stdout, stderr)
			{
				res.end(response(error || stderr, stdout))
			})
		})
	})
})

app.listen(port)
console.log('Listening on port: ' + port);
