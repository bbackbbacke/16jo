const user = require("../model/user");

//메인화면
exports.index = (req, res) => {
    res.render("join")
    // user.get_ranking(function(result){
    //     console.log("result :",result);
        // res.render("join",{data : result});

    // })
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

//login 시도
exports.post_login = (req, res) => {
    User.select( req.body.id, req.body.password, function (result) {
        if (result == null) {
            return res.send({result: result, flag: false});
        } else{
            if (req.body.password != result.password) {
                return res.send({result: result, flag: false});
            }else {
                return res.send({result: result, flag: true});
            }
        }
    });
}


