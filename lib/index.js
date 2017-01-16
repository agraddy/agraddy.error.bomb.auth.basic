var mod = function(message) {
	var error = new Error('Basic Auth Failure');

	if(!message) {
		message = 'Please Log In';
	}

	error.bomb = bomb;

	return error;

	function bomb(err, req, res, lug) {
		res.setHeader('Content-Type', 'application/json');
		res.writeHead(401, {'WWW-Authenticate': 'Basic realm="' + message + '"'});
		res.write('{"status":"error", "message":"' + message + '"}', 'Should return basic JSON.');
		res.end();
	}
}

module.exports = mod;
