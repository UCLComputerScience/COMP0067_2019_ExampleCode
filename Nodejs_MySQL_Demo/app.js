  const db = require('./dbconnection');

  let sql = `CREATE TABLE IF NOT EXISTS testing (
              id INT AUTO_INCREMENT PRIMARY KEY);`;
  db.query(sql, (err, result) => {
          if (err) throw err;
          console.log("Ran query");
  });