
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var session = require('express-session')

var connection = require('./db');


//바디 파싱 허용
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'jomijin',
    resave: true,
    saveUninitialized: true
}))


app.get('/signup', (request, response) => {
    response.sendFile(__dirname + '/signup.html');
})

app.post('/signup', (request, response) => {
    let member_id = request.body.member_id;
    let pw = request.body.pw;
    let confirm_pw = request.body.confirm_pw;
    let email = request.body.email;
    let user_name = request.body.user_name;

    if (member_id && pw && confirm_pw) {
        connection.query('select * from member where member_id = ?', [member_id], function (err, results) {
            if (err) throw error;
            if (results.length <= 0 && pw == confirm_pw) {
                var sql = 'insert into member (member_id, pw, email, user_name) values(?,?,?,?)'
                var values = [member_id, pw, email, user_name];
                connection.query(sql, values, function (err, data) {
                    if (err) throw error2;
                    response.send("<script> alert('환영합니다.');location.href='/';</script>");
                    console.log(member_id + ' sign up')
                });
            } else if (pw != confirm_pw) {
                response.send("<script> alert('비밀번호가 서로 일치하지 않습니다..');location.href='/signup';</script>")
            } else {
                response.send("<script> alert('존재하는 id입니다.');location.href='/signup';</script>")
            }
        })
    }
})

app.get('/', (request, response) => {
    if (request.session.user_id) {
        console.log(request.session.user_id)
    }
    response.sendFile(__dirname + '/index.html')
})

app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/login.html')
})

app.post('/login', (request, response) => {
    const member_id = request.body.member_id;
    const pw = request.body.pw;

    var sql = `select user_id from member where member_id = ? and pw =?`
    var values = [member_id, pw];
    console.log(member_id, pw);

    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            response.send("<script> alert('존재하지 않는 아이디입니다.');location.href='/login';</script>")
        } else {
            console.log(result[0]);

            request.session.user_id = result[0].user_id;
            response.send("<script>alert('로그인 되었습니다..'); location.href='/';</script>")
        }
    })
})


app.listen(port, () => {
    console.log(`예제 앱이 http://localhost:${port} 에서 실행 중입니다.`);
});