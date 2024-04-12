const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var connection = require('./db');

const port = 3000;
require('dotenv').config();

//세션 저장소
const MySQLStore = require('express-mysql-session')(session);
const app = express();

//ejs 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: process.env.DB_DATABASE,
};
const sessionStore = new MySQLStore(options);

//바디 파싱 허용
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false
// }));

app.use(session({
  secret: 'session-secret123!@#',
  resave: false,
  saveUninitialized: false,
}));

app.get('/signup', (request, response) => {
  response.sendFile(__dirname + '/signup.html');
  console.log(process.env.DB_USER2);
});

app.post('/signup', (request, response) => {
  let member_id = request.body.member_id;
  let pw = request.body.pw;
  let confirm_pw = request.body.confirm_pw;
  let email = request.body.email;
  let user_name = request.body.user_name;

  if (member_id && pw && confirm_pw) {
    connection.query(
      'select * from member where member_id = ?',
      [member_id],
      function (err, results) {
        if (err) throw error;
        if (results.length <= 0 && pw == confirm_pw) {
          var sql =
            'insert into member (member_id, pw, email, user_name) values(?,?,?,?)';
          var values = [member_id, pw, email, user_name];
          connection.query(sql, values, function (err, data) {
            if (err) throw error2;
            response.send(
              "<script> alert('환영합니다.');location.href='/';</script>"
            );
            console.log(member_id + ' sign up');
          });
        } else if (pw != confirm_pw) {
          response.send(
            "<script> alert('비밀번호가 서로 일치하지 않습니다..');location.href='/signup';</script>"
          );
        } else {
          response.send(
            "<script> alert('존재하는 id입니다.');location.href='/signup';</script>"
          );
        }
      }
    );
  }
});
// http://localhost:3000
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/MAIN.html');
});

// http://localhost:3000/test (폴더 달라져서 경로 지정 새로 했습니다! /public을 추가했어요)
app.get('/test', (request, response) => {
  if (request.session.user_id) {
    console.log('session.user_id' + request.session.user_id);
  }
  response.sendFile(__dirname + '/public/test.html');
});

//http://localhost:3000/practice
app.get('/practice', (request, response) => {
  if (request.session.user_id) {
    console.log('session.user_id' + request.session.user_id);
  }
  response.sendFile(__dirname + '/practice.html');
});

// http://localhost:3000/login
app.get('/login', (request, response) => {
  response.sendFile(__dirname + '/login.html');
});

app.post('/login', (request, response) => {
  const member_id = request.body.member_id;
  const pw = request.body.pw;

  var sql = `select user_id from member where member_id = ? and pw =?`;
  var values = [member_id, pw];
  console.log(member_id, pw);

  connection.query(sql, values, function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      response.send(
        "<script> alert('존재하지 않는 아이디입니다.');location.href='/login';</script>"
      );
    } else {
      console.log(result[0]);
      //세션 저장하는 부분입니다.
      // request.session.user_id = result[0].user_id;
      request.session.user_id = result[0].user_id; // 세션에 사용자 정보 저장
      console.log('session.user_id : ' + request.session.user_id);
      response.redirect('/');
    }
  });
});

app.post('/save', (req, res) => {

  //console.log(session.getItem('member_id'));s
  var pk = 0;
  var title = req.body.title;
  var content = req.body.content;
  var name = req.body.name;
  var artist = req.body.artist;
  var id = req.body.id;
  var member_id = "";

  connection.query('SELECT count(post_id) AS A from posts, ', (error, rows) => {
    if (error) throw error;
    console.log(typeof rows[0].A);
    pk = rows[0].A;
  });
  var sql = 'SELECT member_id from member where user_id=?';
  connection.query(sql, [id], function (err, result) {
    if (err) throw err;
    member_id = result[0].member_id;
  })
  var sql = 'INSERT INTO posts(post_id, songTitle, singer, title, content, users, view) VALUES (?,?,?,?,?,?,?)';
  connection.query(sql, [pk, name, artist, title, content, member_id, 0], function (err, result) {
    if (err) throw err;

  })
});



// http://localhost:3000  ejs test
app.get('/ejs', (request, response) => {
  // response.sendFile(__dirname + '/MAIN.html');
  let id = request.session.user_id
  console.log("ejs test id : " + id);
  let user_name = '';
  if(id) {
    connection.query('SELECT user_name from member where user_id = ? ',[id], (error, result) => {
      if (error) throw error;
      user_name = result[0];
      console.log(user_name)
    });
  }
  response.render('MAIN', { user : user_name })
});


app.listen(port, () => {
  console.log(`예제 앱이 http://localhost:${port} 에서 실행 중입니다.`);
});
