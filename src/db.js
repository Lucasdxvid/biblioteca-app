const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12311',
  database: 'bibliotecalocal'
});

module.exports = pool;