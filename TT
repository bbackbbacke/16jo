var mysql = require('mysql2');

var con = mysql.createConnection({
  host: '15.165.92.197',
  user: "JUYEON",
  password: "a1234",
  database: "jomijin"
});

con.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log("Connected to database!");

  // 쿼리를 실행하여 데이터베이스에서 정보를 가져오는 예시
  con.query('SELECT * FROM your_table', function (err, result, fields) {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return;
    }
    console.log('Query result:', result);
  });
});
