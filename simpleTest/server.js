var http = require('http');
var mysql = require('mysql');
var config = require('./config');
var qstring = require('querystring');
var url = require('url');

var con = mysql.createConnection({
    host: config.dbHost,
    user: config.user,
    password: config.password,
    database: config.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");  

  var server = http.createServer();

  server.on('request', function(req, res) {
          console.log("server start");  

         sql = "SELECT id, name, singer FROM songs";  

        con.query(sql, (err, results) => {
          if (err) {
             console.dir(err);
          }

          console.log("query successful");  
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end('hello');
          res.end();
        });

    })

    server.listen(config.port, config.host, function() {
      console.log('server is listening at port ' + config.port);
      console.log('pleast visit http://' + config.host + ':' + config.port);
    })

});


