var app;
var path=require('path');

function init(app_){
    app=app_;
}

function ranking(req,res){
    var ideal_name=req.query.name || req.body.name;
    if(!req.session.user){
        console.log(__dirname);
        console.log("로그인이 필요합니다");
        res.sendFile((path.join(__dirname,"../../front"))+"/login.html");
        // res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
        // res.write("<h1>로그인을 해야 랭킹을 등록할 수 있습니다.</h1>");
        // res.write("<h4> Login is required.</h4>");
        // app.get('/',(req,res) => {
        //     res.sendFile((path.join(__dirname,"../../front"))+"/login.html");
        // });
        res.end();
    }
    else{
        // app.get('/',(req,res) => {
        //     res.sendFile((path.join(__dirname,"../../front"))+"/ranking.html");
        // });
    }
}

module.exports.ranking=ranking;
module.exports.init=init;