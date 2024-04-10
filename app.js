const express = require('express')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
const port = 1020

app.use(express.json())

const HOST = process.env.HOST
const DB_USER = process.env.DB_USER // USER -> DB_USER 변경
const PASSWORD = process.env.PASSWORD
const DB_NAME = process.env.DB_NAME

// db 연결
const connect = mysql.createConnection({
    host: HOST,
    user: DB_USER, // USER -> DB_USER 변경
    password: PASSWORD,
    database: DB_NAME,
    port: 3306
})


// http:/localhost:3000
app.get('/', function (req, res) {
    
  res.send('유지영의 서버라능')
})

// http:/localhost:3000/member
app.get("/member", async (req,res)=>{
    const members = await connect.promise().query('select * from member')
    return res.status(201).json({message : '멤버들 목록', data:members})
})

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

/**
 *  열 때 node app.js
 *  닫을 때 ctrl+c
 *  이미 열려있다고 할 때 killall node
 */