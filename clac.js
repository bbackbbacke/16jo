const mysql = require("mysql");
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





//게시판 조회수 랭킹
exports.get_ranking = (cb) => {
    db.query(`SELECT users, title, rank() over(order by view desc) as ranked FROM posts`, (err, rows) => {
        if ( err ) throw err;
        console.log( rows );
        cb( rows )
    });
}




module.exports = calc;