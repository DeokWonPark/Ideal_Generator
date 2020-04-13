
function ranking(req,res){
    var ideal_name=req.query.name || req.body.name;
    if(!req.session.user){
        console.log("로그인 필요");
        res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
        res.write("<h1>로그인을 해야 랭킹을 등록할 수 있습니다.</h1>");
        res.write("<h4> Login is required.</h4>");
        res.end();
    }
    else{
        
    }
}

module.exports.ranking=ranking;
