process.chdir('test');
var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var mod = require('../');

start();

function start() {
	var error = mod(); 
	var res = response();

	tap.assert(error instanceof Error, 'Should return an error.');
	tap.assert.equal(typeof error.bomb, 'function', 'Should have a bomb method.');

	res.on('finish', function() {
		tap.assert.equal(res._headers['www-authenticate'], 'Basic realm="Please Log In"', 'Should set WWW-Authenticate header.');
		tap.assert.equal(res._headers['content-type'], 'application/json', 'Default should be a application/json.');
		tap.assert.equal(res._body, '{"status":"error", "message":"Please Log In"}', 'Should return basic JSON.');

		custom();
	});

	error.bomb(res);

}

function custom() {
	var error = mod('Custom Message'); 
	var res = response();

	tap.assert(error instanceof Error, 'Should return an error.');
	tap.assert.equal(typeof error.bomb, 'function', 'Should have a bomb method.');

	res.on('finish', function() {
		tap.assert.equal(res._headers['www-authenticate'], 'Basic realm="Custom Message"', 'Should set WWW-Authenticate header.');
		tap.assert.equal(res._headers['content-type'], 'application/json', 'Default should be a application/json.');
		tap.assert.equal(res._body, '{"status":"error", "message":"Custom Message"}', 'Should return basic JSON.');

		end();
	});

	error.bomb(res);
}

function end() {
}



