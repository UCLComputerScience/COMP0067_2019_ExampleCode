var qstring = require('querystring')
var formidable = require('formidable')
var config = require('../config')
var path = require('path')

var storage = [
  { id: 1, title: 'Hey Jude', singer: 'The Beatles' },
  { id: 2, title: 'Lucky star', singer: 'Madonna Louise Ciccone' },
  { id: 3, title: 'We are the world', singer: 'Michael Joseph Jackson' },
]

exports.showIndex = function(req, res) {
  res.render('index', {
    title: 'Home',
    musicList: storage
  })
}

exports.showAdd = function(req, res) {
  res.render('add', {
    title: 'Add Song'
  })
}

exports.doAdd = function(req, res) {
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.end(err.message)
    }
    var title = fields.title
    var singer = fields.singer
    var id = 0
    storage.forEach(function(item) {
      if (item.id > id) {
        id = item.id
      }
    })
    storage.push({
      id: id + 1,
      title: title,
      singer: singer
    })
    res.writeHead(302, {
      'Location': 'http://127.0.0.1:3000/'
    })
    res.end()
  })

}

exports.showEdit = function(req, res) {
  var id = req.query.id
  var music = {}
  storage.forEach(function(item, index) {
    if (item.id == id) {
      music = item
    }
  })
  res.render('edit', {
    title: 'Edit Song',
    music: music
  })
}

exports.doEdit = function(req, res) {
  var id = req.query.id
  var data = ''
  req.on('data', function(chunk) {
    data += chunk
  })
  req.on('end', function() {
    var postBody = qstring.parse(data)
      var music_index = 0
      storage.forEach(function (item, index) {
        if (item.id == id) {
          music_index = index
        }
      })
      storage[music_index].title = postBody.title
      storage[music_index].singer = postBody.singer
      res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000/'
      })
      res.end()
  })

}


exports.doRemove = function(req, res) {
  var id = req.query.id
  var music_index = 0
  storage.forEach(function(item, index) {
      if (item.id == id) {
        music_index = index
      }
    })
  storage.splice(music_index, 1)
  res.writeHead(302, {
    'Location': 'http://127.0.0.1:3000/'
  })
  res.end()
}
