const user = require("../model/user");

//메인화면
exports.index = (req, res) => {
    user.get_ranking(function(result){
        console.log("result :",result);
        res.render("main",{data : result});

    })
}



//User 정보 저장하기
exports.post_user = (req, res) => {

    user.insert( req.body, function (result) {  
        res.send({ id: result});
    })
}

//회원가입 화면
exports.join = (req, res) => {
    res.render("join");
}
//login 화면
exports.login = (req, res) => {
    res.render("login");
}




