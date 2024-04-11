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
// 랭킹화면

//login 시도
exports.post_login = (req, res) => {
    user.select( req.body.id, req.body.pw, function (result) {
        if (result == null) {
            return res.send({result: result, flag: false});
        } else{
            if (req.body.pw != result.pw) {
                return res.send({result: result, flag: false});
            }else {
                return res.send({result: result, flag: true});
            }
        }
    });
}
