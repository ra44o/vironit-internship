const mysql = require('mysql-easier');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'ra44o',
  password: 'rak1997',
  database: 'vironit'
});

module.exports = pool;