    const mysql = require('mysql');

    async function checkIfDatabaseExists(){
      return new Promise((resolve, reject) => {
        const checkConnection = mysql.createConnection({
          host: localhost,
          user: root,
          password: <YOUR PASSWORD>,
          insecureAuth : true,
        });
          
        checkConnection.connect(function(err) {
          if (err) throw err;
          let sql = `CREATE DATABASE IF NOT EXISTS <name of database>`;
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
      password: <YOUR PASSWORD>,
      database: <name of database>,
      insecureAuth : true,
    });

    module.exports = connection;