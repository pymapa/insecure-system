// Init SQL connection
var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db in " + process.env.DB_HOST);
});

exports.getQuery = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, data) => {
            if(err)
                reject(err)
            resolve(data);
        })
    })
}

// export default db;