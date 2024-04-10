const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',
    password: '3545',
    port: 3300,
    database: 'test'
});

// const mysql = require('mysql')
// const connection = mysql.createConnection({
//     host: '15.165.92.197',
//     user: 'JUYEON',
//     password: 'a1234',
//     port: 3306,
//     database: 'jomijin'
// });

module.exports = connection;