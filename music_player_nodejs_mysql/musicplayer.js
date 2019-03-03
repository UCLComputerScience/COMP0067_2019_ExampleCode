var http = require('http');
var config = require('./config');
// var router = require('./router');
// var render = require('./common/render');

var server = http.createServer();

// server.on('request', function(req, res) {
// 	console.log('render start');
//   render(res);
//   router(req, res);
// })

// server.listen(config.port, config.host, function() {
//   console.log('server is listening at port ' + config.port);
//   console.log('pleast visit http://' + config.host + ':' + config.port);
// })

var server = http.createServer(function (req, res) {
	console.log('sever start');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
  
   
})

server.listen(3000, function() {
     console.log('server is listening at port 3000');
     
})



// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World!');
  
//    console.log('server is listening at port 3000');
// }).listen(3000);