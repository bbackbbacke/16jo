const express = require('express')
const axios = require('axios')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const port = 3306
const path = require('path')


const app = express()

// configuration =========================
app.set('view engine','ejs')
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = require("./routes")

app.use("/", router);

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});