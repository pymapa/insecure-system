const express = require('express')
const app = express()

// Load environment variables from ./.env
require('dotenv').config();

// Init SQL connection
var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db in " + process.env.DB_HOST);
});

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(app.get('port'), () => {
    console.log('Example app listening on port 3000!')
});