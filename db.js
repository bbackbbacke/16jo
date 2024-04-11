const mysql = require('mysql')
require('dotenv').config();

// const connection = mysql.createConnection({

//     host: process.env.DB_HOST2,
//     user: process.env.DB_USER2,
//     password: process.env.DB_PASSWORD2,
//     port: process.env.DB_POSRT2,
//     database: process.env.DB_DATABASE2
// });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    database: process.env.DB_DATABASE
});

module.exports = connection;