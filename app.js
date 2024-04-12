const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var connection = require('./db');

const app = express();
const port = 3000;
require('dotenv').config();

//세션 저장소
var MySQLStore = require('express-mysql-session')(session);

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: process.env.DB_DATABASE,
};
var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: 'asdfasffdas',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

//바디 파싱 허용
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'jomijin',
    resave: true,
    saveUninitialized: true,
  })
);

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
  if (request.session.user_id) {
    console.log('session.user_id' + request.session.user_id);
  }
  response.sendFile(__dirname + '/MAIN.html');
});

// http://localhost:3000/test (폴더 달라져서 경로 지정 새로 했습니다! /public을 추가했어요)
app.get('/test', (request, response) => {
  if (request.session.user_id) {
    console.log('session.user_id' + request.session.user_id);
  }
  response.sendFile(__dirname + '/public/test.html');
});

//http://localhost:3000/practice 마이페이지
app.get('/practice', (request, response) => {
  if (request.session.user_id) {
    console.log('session.user_id' + request.session.user_id);
  }
  response.sendFile(__dirname + '/practice.html');
});

// http://localhost:3000/login 로그인
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
      request.session.uid = result[0].user_id; // 세션에 사용자 정보 저장
      response.redirect('/');
    }
  });
});

app.post('/save', (req, res) => {
  // console.log(req.session.userid);
  var pk = 0;
  var title = req.body.title;
  var content = req.body.content;
  var name = req.body.name;
  var artist = req.body.artist;
  var id = req.session.uid;
  if (id) {
    res.send(
      "<script>alert('로그인 되었습니다..'); location.href='/';</script>"
    );
    console.log('현재 유저 아이디는 ' + id);
  } else {
    res.send("<script>alert('xx 되었습니다..'); location.href='/';</script>");
    console.log(id);
  }
});

app.listen(port, () => {
  console.log(`예제 앱이 http://localhost:${port} 에서 실행 중입니다.`);
});
