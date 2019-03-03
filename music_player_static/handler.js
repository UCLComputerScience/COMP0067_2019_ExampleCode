exports.showIndex = function(req, res) {
  res.render('index', {
    title: 'Index'
  })
}

exports.showAdd = function(req, res) {
  res.render('add', {
    title: 'Add Song'
  })
}

exports.showEdit = function(req, res) {
  res.render('edit', {
    title: 'Edit Song'
  })
}

exports.showRegister = function(req, res) {
  res.render('register')
}
