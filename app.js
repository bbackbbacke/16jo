const express = require('express')
const app = express()
const port = 1020

app.get('/', function (req, res) {
    
  res.send('유지영의 서버라능')
})

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

/**
 *  열 때 node app.js
 *  닫을 때 con+c
 *  이미 열려있다고 할 때 killall node
 */