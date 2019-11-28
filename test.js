var rmqmanager = require('./index.js');

var host = "whale-01.rmq.cloudamqp.com";
var port = 443;
var user = "snasifln";
var pwd = "XgkxeAJqbxarsLMz59cNXFPjIiQn2LsH";

var client = rmqmanager.client({
    https: true,
    host: host,
    port: port,
    timeout: 25000,
    user: user,
    password: pwd
});




//queuein-integration-2
client.getQueue({
    vhost: 'snasifln',
    queue: 'queuein-integration-2'
}, function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(data)
});