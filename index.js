<<<<<<< HEAD
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
=======
const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./db');
const connection = mysql.createConnection(dbconfig);
const path = require('path');
const bp = require('body-parser');

///var session = require('express-session');

const app = express();
app.use(express.static('public'));
// app.use(session({
//   secret:'jomijin'
//   resave:true,
//   saveUninitialized:true
// }))

app.use(bp());


connection.connect(error=>{
  if(error) throw error;
 
});
//session.setItem('member_id', 'ffffffffffff')
// configuration =========================
app.set('port', process.env.PORT || 3600);

app.get("/", function(req, res){
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
  // console.log(req.session.userid);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
  res.sendfile("public/test.html");
});

app.post('/save', (req, res) => {
  
  //console.log(session.getItem('member_id'));s
  var pk = 0;
  var title = req.body.title;
  var content = req.body.content;
  var name = req.body.name;
  var artist = req.body.artist;
  var id=req.body.id;
  var member_id="";

  connection.query('SELECT count(post_id) AS A from posts, ', (error, rows) => {
      if (error) throw error;
      console.log(typeof rows[0].A);
      pk = rows[0].A;  
  });
  var sql='SELECT member_id from member where user_id=?';
  connection.query(sql, [id], function(err, result){
    if(err) throw err;
      member_id=result[0].member_id;
  })
  var sql='INSERT INTO posts(post_id, songTitle, singer, title, content, users, view) VALUES (?,?,?,?,?,?,?)';
  connection.query(sql, [pk, name, artist, title, content, member_id, 0], function(err, result){
    if(err) throw err;
      
  })
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
>>>>>>> d383cea3b8203506f2bfead4dd7e0afe46b6e439
});