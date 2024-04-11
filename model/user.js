const mysql = require("mysql");
const db = mysql.createConnection({
  host: "15.165.92.197",
  name: "JUYEON",
  password: "a1234",
  database: "jomijin",
  port : "3306"
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
    var sql = `SELECT * FROM user WHERE id='${id}' limit 1`;

    db.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows[0] );
    });
}
