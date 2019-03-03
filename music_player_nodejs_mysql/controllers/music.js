var mysql = require('mysql');
var qstring = require('querystring');
var formidable = require('formidable');
var config = require('../config');

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");  
});

exports.showIndex = function(req, res) {
  let sql = "SELECT * FROM `songs` ORDER BY id ASC";  

  con.query(sql, (err, result) => {
    if (err) {
       res.redirect('/');
    }
    res.render('index', {
       title: 'Home Page',
       musicList: result
    });
  });
}

exports.showAdd = function(req, res) {
  res.render('add', {
    title: 'Add Song'
  })
}

exports.doAdd = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {
    if (err) {
      return res.end(err.message);
    }
    var title = fields.title;
    var singer = fields.singer;

    let sql =  "INSERT INTO `songs` (title, singer) VALUES ('" +
                            title + "', '" + singer + "')";

    con.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.writeHead(302, {
         'Location': 'http://127.0.0.1:3000/'
      });
      res.end();
    });
  })
}

exports.showEdit = function(req, res) {
  var id = req.query.id
  let sql = "SELECT * FROM `songs` WHERE id = '" + id + "' ";
  con.query(sql, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.render('edit', {
          title: "Edit Song",
          music: result[0]
      });
  });  
}

exports.doEdit = function(req, res) {
  var id = req.query.id;
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  })
  req.on('end', function() {
    var postBody = qstring.parse(data)

    let sql = "UPDATE `songs` SET `title` = '" + postBody.title +
     "', `singer` = '" + postBody.singer + "' WHERE `songs`.`id` = '" + id + "'";
    con.query(sql, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.writeHead(302, {
          'Location': 'http://127.0.0.1:3000/'
      })
      res.end()
    });
  })
}


exports.doRemove = function(req, res) {
  var id = req.query.id
  
  let sql = 'DELETE FROM songs WHERE id = "' + id + '"';
  
  con.query(sql, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.writeHead(302, {
      'Location': 'http://127.0.0.1:3000/'
    })
    res.end()
  });
}
