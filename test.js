var rmqmanager = require('./index.js');

// var host = "whale-01.rmq.cloudamqp.com";
// var port = 443;
// var user = "snasifln";
// var pwd = "XgkxeAJqbxarsLMz59cNXFPjIiQn2LsH";

var host = "localhost";
var port = 3012;
var user = "guest";
var pwd = "guest";

var client = rmqmanager.client({
    https: false,
    host: host,
    port: port,
    timeout: 25000,
    user: user,
    password: pwd
});




//queuein-integration-2
client.getQueue({
    vhost: '/',
    queue: 'queuein-integration-2'
}, function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(data)
});