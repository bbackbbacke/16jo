const mysql = require("mysql");
const { connect } = require("../routes");
const db = mysql.createConnection({
  host: "15.165.92.197",
  user: "JUYEON",
  password: "a1234",
  database: "jomijin",
  port : 3306
});

db.connect(function(err){
    if(err){
        console.log('에러'+err.stack);
        return;
    }
    console.log(db.threadId);
})


//회원가입 정보 입력
exports.insert = ( data, cb ) => {
    var sql = `INSERT INTO member VALUES ('${data.member_id}', '${data.user_name}', '${data.email}','${data.pw}');`;

    db.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( data.id );
    });
}

//로그인 정보 읽기
exports.select = ( id, pw, cb ) => {
    var sql = `SELECT * FROM user WHERE member_id='${id}' limit 1`;

    db.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows[0] );
    });
}
//게시판 조회수 랭킹
exports.get_ranking = (cb) => {
    db.query(`SELECT users, title, rank() over(order by view desc) as ranked FROM posts`, (err, rows) => {
        if ( err ) throw err;
        console.log( rows );
        cb( rows )
    });
}
//게시판 오늘 조회수 랭킹
exports.get_ranking2 = (cb) => {
    db.query(`SELECT * FROM posts`, (err, rows) => {
        if ( err ) throw err;
        console.log( rows );
        cb( rows )
    });
}
exports.loginProc= (cb)=>{
    const member_id = req.body.name;
    const pw = req.pw;

    var sql = `select * from member where member_id=? and pw=?`

    var values = [member_id, pw];

    db.query(sql, values, function(err, result){
        if(err) throw err;
        res.send(cb)
    })
}