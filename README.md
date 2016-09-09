# RabbitMQ HTTP API Client for Node

This library is a [RabbitMQ HTTP API](https://raw.githack.com/rabbitmq/rabbitmq-management/rabbitmq_v3_6_0/priv/www/api/index.html) client for Node.js




## Supported RabbitMQ Versions

 * RabbitMQ 3.x

All versions require [RabbitMQ Management UI plugin](http://www.rabbitmq.com/management.html) to be installed and enabled.

## Installation

```
npm install http-rabbitmq-manager
```


## Documentation

### Usage

Create a client instance

``` js
	var client = require('http-rabbitmq-manager').client({
		host : 'localhost',
    	port : 15672,
  		timeout : 25000,
        user : 'guest',
        password : 'guest'
	});
```
If any field is missing is used the default value from above

### Overview

``` js
	client.overview(function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	client.getClusterName(function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	client.setClusterName({name : 'my_name@my_node'}, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// A list of extensions to the management plugin
	client.listExtensions(function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//The server definitions - exchanges, queues, bindings, users, virtual hosts, permissions and parameters
	client.listDefinitions(function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	client.setDefinitions( {definition : 'my_definition'}, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

```

### Nodes

``` js
	// List all the nodes from cluster
	client.listNodes(function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Get statistics about an individual node
	// Optional memory : true to get memory statistics
	client.getNode({
		name : 'node_name',
		memory : true
	}, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

```

### Connections

``` js
	// A list of all open connections
	client.listConnections(function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Get statistics about an individual connection
	client.getConnection({
		connection : 'connection_name'
	}, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Close a connection
	client.closeConnection({
		connection : 'connection_name'
	}, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
```

### Channels & Consumers

``` js
	/* Use empty object for all open channels,
       vhost for all open channels in a specific vhost and connection for all channels for a given connection.
       Vhost property and connection property cannot be used in the same time.
    */
	client.listChannels({
		vhost : 'vhost_name',
		connection : 'connection_name'
    }, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	client.getChannel({
		channel : channel
    }, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	/* 
	   Use empty object for all consumers,
       vhost for all consumers in a given virtual host.
    */
	client.listConsumers({
		vhost : 'vhost_name',
    }, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

```

### Exchanges

``` js
	/* 
	   Use empty object for all exchanges,
       vhost for all exchanges in a given virtual host.
    */
	client.listExchanges({
		vhost : 'vhost_name'
	}, function  (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Get statistics about an individual exchange. Vhost is mandatory
	client.getExchange({
		vhost : 'vhost_name',
		exchange : 'exchange_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Create an exchange. The vhost, exchange and type key are mandatory; other keys are optional.
	client.createExchange({
		vhost : 'vhost_name',
		exchange : 'exchange_name',
		type : 'direct',
		auto_delete : false,
		durable : true,
		internal : false,
		arguments : {}
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Delete an exchange
	client.deleteExchange({
		vhost : 'vhost_name',
		exchange : 'exchange_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Publish message to exchange
	//TO DO

```

### Bindings

``` js
	/* 
	   Use empty object for all bindings,
       vhost for all bindings in a given virtual host.
    */
	client.listBindings({
		vhost : 'vhost_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// A list of all bindings on a given queue.
	client.getQueueBindings({
		vhost : 'vhost_name',
		queue : 'queue_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//A list of all bindings in which a given exchange is the source.
	client.getBindingsForSource({
		vhost : 'vhost_name',
		exchange : 'exchange_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//A list of all bindings in which a given exchange is the destination.
	client.getBindingsForDestination({
		vhost : 'vhost_name',
		exchange : 'exchange_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
```

### Queues

``` js
	/* 
	   Use empty object for all queues,
       vhost for all queues in a given virtual host.
    */
	client.listQueues({
		vhost : 'vhost_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//An individual queue
	client.getQueue({
		vhost : 'vhost_name',
		queue : 'queue_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Create a queue. Vhost and queue name are mandatory, the rest of keys are optional
	client.createQueue({
		vhost : 'vhost_name',
		queue : 'queue_name',
		auto_delete : false,
		durable : true,
		arguments : {},
		node : rabbit@smacmullen
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Delete a queue
	client.deleteQueue({
		vhost : 'vhost_name',
		queue : 'queue_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Purge a queue
	client.purgeQueue({
		vhost : 'vhost_name',
		queue : 'queue_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Take action to queue. Currently the actions which are supported are sync and cancel_sync.
	client.setQueueActions({
		vhost : 'vhost_name',
		queue : 'queue_name',
		action : 'sync'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Get messages from a queue. Truncate is optional; all other keys are mandatory.
	client.getMessages({
		vhost : 'vhost_name',
		queue : 'queue_name',
		count : 5,
		requeue : true,
		encoding : "auto",
		truncate : 50000
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

```

### Vhosts

``` js
	/* 
	   Use empty object for all vhosts,
       vhost for certain vhost
    */
	client.listVhosts({
		vhost : 'vhost_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Delete a vhost
	client.deleteVhost({
		vhost : 'vhost_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// Create a vhost
	client.createVhost({
		vhost : 'vhost_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	//Get permissions for a vhost
	client.getVhostPermissions({
		vhost : 'vhost_name'
	}, function (err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

```