var httpClients = require('./clients.js');

/**
 *   Create a new client. Default config :
 *
 *   var client = require('rabbitmq-manager').client({
 *   	host : 'localhost',
 *   	port : 15672,
 * 		timeout : 25000,
 *      user : 'guest',
 *      password : 'guest'
 *   });
 **/

exports.client = function(config) {
	config = config || {};
	return new Client(config);
}


var Client = function(config) {

	/* Use timeout for http requests */

	var timeout = config.timeout || 25000;

	var options = {
		host : config.host || 'localhost',
		port : config.port || 15672, 
		auth : (config.guest || 'guest') + ':' + (config.password || 'guest'),
		headers:{
        	"content-type" : "application/json"
        }
	}
	
	this.getClient = new httpClients.getClient(options, timeout);
	this.putClient = new httpClients.putClient(options, timeout);
	this.postClient = new httpClients.postClient(options, timeout);
	this.deleteClient = new httpClients.deleteClient(options, timeout);
};


/* Cluster methods */
Client.prototype.overview = function(_cb) {
	var path = '/api/overview';
	this.getClient.makeRequest(path, _cb);
};

Client.prototype.getClusterName = function(_cb) {
	var path = '/api/cluster-name';
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.setClusterName = function(body, _cb) {
	var path = '/api/cluster-name';
	if (!body || !body.name) {
		_cb({
			message : "Name not provided"
		});
		return;
	}
	this.putClient.makeRequest(path, {name : body.name}, _cb);
}


/* Nodes methods */
Client.prototype.listNodes = function(_cb) {
	var path = '/api/nodes';
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.getNode = function(body, _cb) {
	var path = '/api/nodes/';
	if (!body || !body.name) {
		_cb ({
			message : "Node name not provided"
		});
		return;
	}
	path += encodeURIComponent(body.name);
	if (body.memory) {
		path += '?memory=true';
	}
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.listExtensions = function(_cb) {
	var path = '/api/extensions';
	this.getClient.makeRequest(path, _cb);
}

/* Definitions */
Client.prototype.listDefinitions = function(_cb) {
	var path = '/api/definitions';
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.setDefinitions = function(body, _cb) {
	var path = '/api/definitions';
	if (!body || !body.definition) {
		_cb({
			message : 'Definition not provided'
		});
		return;
	}
	this.postClient.makeRequest(path, {file : body.definition}, _cb);
}

/* Connections */
Client.prototype.listConnections = function(_cb) {
	var path = '/api/connections';
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.getConnection = function(body, _cb) {
	var path = '/api/connections/';
	if (!body || !body.connection) {
		_cb ({
			message : "Connection name not provided"
		});
		return;
	}
	path += encodeURIComponent(body.connection);
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.closeConnection = function(body, _cb) {
	var path = '/api/connections/';
	if (!body || !body.connection) {
		_cb ({
			message : "Connection name not provided"
		});
		return;
	}
	path += encodeURIComponent(body.connection);
	this.deleteClient.makeRequest(path, _cb);
}


/* Get a list of all open channels.
 * If body.vhost is defined get all open channels from certain vhost
 * If body.connection is defined get all open channels from certain connection
 */

Client.prototype.listChannels = function(body, _cb) {
	var path = '/api/channels';

	if (body && body.vhost) {
		path = '/api/vhosts/' + encodeURIComponent(body.vhost) + '/channels'
	}

	if (body && body.connection) {
		path = '/api/connections/' + encodeURIComponent(body.connection) + '/channels'
	}
	this.getClient.makeRequest(path, _cb);
}


Client.prototype.getChannel = function(body, _cb) {
	var path = '/api/channels/';
	if (!body || !body.channel) {
		_cb ({
			message : "Channel name not provided"
		});
		return;
	}

	path += encodeURIComponent(body.channel);
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.listConsumers = function(body, _cb) {
	var path = '/api/consumers';
	if (body && body.vhost) {
		path += '/' + encodeURIComponent(body.vhost);
	}
	this.getClient.makeRequest(path, _cb);
}


/* Exchanges */
Client.prototype.listExchanges = function(body, _cb) {
	var path = '/api/exchanges';
	if (body && body.vhost) {
		path += '/' + encodeURIComponent(body.vhost);
	}
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.getExchange = function(body, _cb) {
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name not provided"
		});
		return;
	}
	if (!body.exchange) {
		_cb({
			message : "Exchange name not provided"
		});
		return;
	}
	var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange);
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.createExchange = function(body, _cb) {
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost not provided"
		});
		return;
	}
	if (!body.exchange) {
		_cb({
			message : "Exchange name not provided"
		});
		return;
	}
	if (!body.type) {
		_cb({
			message : "Exchange type not provided"
		});
		return;
	}
	var put_body = {
		type : body.type,
		auto_delete : body.auto_delete,
		durable : body.durable,
		internal : body.internal,
		arguments : body.arguments
	}
	var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange);
	this.putClient.makeRequest(path, put_body, _cb);
}

Client.prototype.deleteExchange = function(body, _cb) {
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name not provided"
		});
		return;
	}
	if (!body.exchange) {
		_cb({
			message : "Exchange name not provided"
		});
		return;
	}
	var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange);
	this.deleteClient.makeRequest(path, _cb);
}

Client.prototype.getBindingsForSource = function(body, _cb) {
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name not provided"
		});
		return;
	}
	if (!body.exchange) {
		_cb({
			message : "Exchange name not provided"
		});
		return;
	}
	var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange) + '/bindings/source';

	this.getClient.makeRequest(path, _cb);
}

Client.prototype.getBindingsForDestination = function(body, _cb) {
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name not provided"
		});
		return;
	}
	if (!body.exchange) {
		_cb({
			message : "Exchange name not provided"
		});
		return;
	}
	var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange) + '/bindings/destination';
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.publishMessage = function(body, _cb) {
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name not provided"
		});
		return;
	}
	if (!body.exchange) {
		_cb({
			message : "Exchange name not provided"
		});
		return;
	}
	if (!body.properties || !body.routing_key || !body.payload || !body.payload_encoding) {
		_cb({
			message : "Body missing mandatory field: properties, routing_key, payload, payload_encoding"
		});
		return;
	}
	var path = '/api/exchanges/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.exchange) + '/bindings/destination';
	var post_body = {
		properties : body.properties,
		routing_key : body.routing_key,
		payload : body.payload,
		payload_encoding : body.payload_encoding
	}
	this.postClient.makeRequest(path, post_body, _cb);
}

/* Queues */

Client.prototype.listQueues = function(body, _cb) {
	var path = '/api/queues';
	if (body && body.vhost) {
		path += '/' + encodeURIComponent(body.vhost);
	}
	this.getClient.makeRequest(path, _cb);
}


var checkQueueParams = function(body) {
	if (!body || !body.vhost) {
		return {
			message : "Vhost not provided"
		};
	}
	if (!body.queue) {
		return {
			message : "Queue not provided"
		};
	}
	return null;
}

Client.prototype.getQueue = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}

	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue);
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.createQueue = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}
	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue);
	var put_body = {
		auto_delete : body.auto_delete,
		durable : body.durable,
		node : body.node,
		arguments : body.arguments
	}
	this.putClient.makeRequest(path, put_body, _cb);
}

Client.prototype.deleteQueue = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}
	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue);
	this.deleteClient.makeRequest(path, _cb);
}

Client.prototype.getQueueBindings = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}
	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/bindings';
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.purgeQueue = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}
	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/contents';
	this.deleteClient.makeRequest(path, _cb);
}

Client.prototype.setQueueActions = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}
	if (!body.action) {
		_cb({
			message : "Action is missing"
		});
		return;
	}
	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/actions';
	this.postClient.makeRequest(path, {action : body.action}, _cb);
}

Client.prototype.getMessages = function(body, _cb) {
	var err = checkQueueParams(body);
	if (err) {
		_cb(err);
		return;
	}
	if (!body.count || !body.requeue || !body.encoding ) {
		_cb({
			message : "Body missing mandatory field: count, requeue, encoding"
		});
		return;
	}

	var path = '/api/queues/' + encodeURIComponent(body.vhost) + '/' + encodeURIComponent(body.queue) + '/get';
	var post_body = {
		count : body.count,
		requeue : body.requeue,
		encoding : body.encoding,
		truncate : body.truncate
	}
	this.postClient.makeRequest(path, post_body, _cb);
}

/* Bindings */
Client.prototype.listBindings = function(body, _cb) {
	var path = '/api/bindings';
	if (body && body.vhost) {
		path += '/' + encodeURIComponent(body.vhost);
	}
	this.getClient.makeRequest(path, _cb);
}

/*Vhosts */
Client.prototype.listVhosts = function(body, _cb) {
	var path = '/api/vhosts';
	if (body && body.vhost) {
		path += '/' + encodeURIComponent(body.vhost);
	}
	this.getClient.makeRequest(path, _cb);
}

Client.prototype.deleteVhost = function(body, _cb) {
	var path = '/api/vhosts';
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name is missing"
		});
		return;
	}
	path += '/' + encodeURIComponent(body.vhost);
	this.deleteClient.makeRequest(path, _cb);
}

Client.prototype.createVhost = function(body, _cb) {
	var path = '/api/vhosts';
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name is missing"
		});
		return;
	}
	path += '/' + encodeURIComponent(body.vhost);
	this.putClient.makeRequest(path, {}, _cb);
}

Client.prototype.getVhostPermissions = function(body, _cb) {
	var path = '/api/vhosts';
	if (!body || !body.vhost) {
		_cb({
			message : "Vhost name is missing"
		});
		return;
	}
	path += '/' + encodeURIComponent(body.vhost) + '/permissions';
	this.getClient.makeRequest(path, _cb);
}