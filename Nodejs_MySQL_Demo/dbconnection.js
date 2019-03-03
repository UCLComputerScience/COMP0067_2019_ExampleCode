    const mysql = require('mysql');

    async function checkIfDatabaseExists(){
      return new Promise((resolve, reject) => {
        const checkConnection = mysql.createConnection({
          host: localhost,
          user: root,
          password: szfy2511,
          insecureAuth : true,
        });
          
        checkConnection.connect(function(err) {
          if (err) throw err;
          let sql = `CREATE DATABASE IF NOT EXISTS myDB`;
          checkConnection.query(sql, (err) => {
            if (err) throw err;
            resolve();
          });
        })
      })
    }

    checkIfDatabaseExists();
    var connection = mysql.createPool({
      host: localhost,
      user: root,
      password: szfy2511,
      database: myDB,
      insecureAuth : true,
    });

    module.exports = connection;