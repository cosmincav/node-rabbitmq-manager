var http = require('http');
var querystring = require('querystring');

module.exports = {
	getClient : function (options, timeout) {
		this.options = JSON.parse(JSON.stringify(options));
		this.options.method = 'GET';
		this.timeout = timeout;

		this.makeRequest = function(path, _cb) {
			this.options.path = path;
			var req = http.get(this.options, function(res) {
				var body = '';
				res.on('data', function(chunk) {
					body += chunk;
				});
				res.on('end', function() {
					if (res.statusCode < 200 || res.statusCode > 299) {
						_cb ({
							message : 'Status ' + res.statusCode
						});
						return;
					}
					var obj;
					try {
				        obj = JSON.parse(body);
				        _cb(null, obj);
				    } catch(e) {
				        _cb(null, {result : 'Success'});
				    }
				});
			});

			req.on('error', function(e) {
				/* AVoid double cb on timeout */
				if (e.code !== "ECONNRESET") {
					_cb(e);
				}
			});

			req.setTimeout(this.timeout, function() {
				req.abort();
				_cb({
					message : "Request timeout"
				});
			});
		}
	},
	putClient : function (options, timeout) {
		this.options = JSON.parse(JSON.stringify(options));
		this.options.method = 'PUT';
		this.timeout = timeout;

		this.makeRequest = function(path, put_body, _cb) {
			this.options.path = path;
			var req = http.request(this.options, function(res) {
				var body = '';
				res.on('data', function(chunk) {
					body += chunk;
				});
				res.on('end', function() {
					if (res.statusCode < 200 || res.statusCode > 299) {
						_cb ({
							message : 'Status ' + res.statusCode
						});
						return;
					}
					var obj;
					try {
				        obj = JSON.parse(body);
				        _cb(null, obj);
				    } catch(e) {
				        _cb(null, {result : 'Success'});
				    }
				});
			});

			req.on('error', function(e) {
				/* AVoid double cb on timeout */
				if (e.code !== "ECONNRESET") {
					_cb(e);
				}
			});

			req.setTimeout(this.timeout, function() {
				req.abort();
				_cb({
					message : "Request timeout"
				});
			});
			req.end(JSON.stringify(put_body));
		}
	},
	postClient : function (options, timeout) {
		this.options = JSON.parse(JSON.stringify(options));
		this.options.method = 'POST';
		this.timeout = timeout;
		this.options.headers = {
        	"content-type" : "application/application-json"
        }

		this.makeRequest = function(path, post_body, _cb) {
			this.options.path = path;
			var postData = JSON.stringify(post_body);
			this.options.headers['Content-Length'] = postData.length;
			var req = http.request(this.options, function(res) {
				var body = '';
				res.on('data', function(chunk) {
					body += chunk;
				});
				res.on('end', function() {
					if (res.statusCode < 200 || res.statusCode > 299) {
						_cb ({
							message : 'Status ' + res.statusCode
						});
						return;
					}
					var obj;
					try {
				        obj = JSON.parse(body);
				        _cb(null, obj);
				    } catch(e) {
				        _cb(null, {result : 'Success'});
				    }
				});
			});

			req.on('error', function(e) {
				/* AVoid double cb on timeout */
				if (e.code !== "ECONNRESET") {
					_cb(e);
				}
			});

			req.setTimeout(this.timeout, function() {
				req.abort();
				_cb({
					message : "Request timeout"
				});
			});
			req.write(postData);
			req.end();
		}
	},
	deleteClient : function (options, timeout) {
		this.options = JSON.parse(JSON.stringify(options));
		this.options.method = 'DELETE';
		this.timeout = timeout;

		this.makeRequest = function(path, _cb) {
			this.options.path = path;
			var req = http.request(this.options, function(res) {
				var body = '';
				res.on('data', function(chunk) {
					body += chunk;
				});
				res.on('end', function() {
					if (res.statusCode < 200 || res.statusCode > 299) {
						_cb ({
							message : 'Status ' + res.statusCode
						});
						return;
					}
					var obj;
					try {
				        obj = JSON.parse(body);
				        _cb(null, obj);
				    } catch(e) {
				        _cb(null, {result : 'Success'});
				    }
				});
			});

			req.on('error', function(e) {
				/* AVoid double cb on timeout */
				if (e.code !== "ECONNRESET") {
					_cb(e);
				}
			});

			req.setTimeout(this.timeout, function() {
				req.abort();
				_cb({
					message : "Request timeout"
				});
			});
			req.end();
		}
	}
}