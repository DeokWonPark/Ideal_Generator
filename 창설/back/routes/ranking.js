var sqlInsertIdeal="update users set my_ideal=? where name=?;"
var pool;

function init(pool_){
    pool=pool_;
}
function ranking(req,res){
    var ideal_name=req.query.name || req.body.name;
    if(!req.session.user){
        console.log("로그인 필요");
        console.log(req.session);
        res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
        res.write("<h1>로그인을 해야 랭킹을 등록할 수 있습니다.</h1>");
        res.write("<h4> Login is required.</h4>");
        res.end();
    }
    else{
        console.log(req.session.user);
        pool.getConnection(function(err,conn){
            if(err){
                if(conn){
                    conn.release();
                }
                console.dir(err);
                // callback(err,null);
                return;
            }
    
            var data=["../images/ideal/ideal.PNG",req.session.user.name]
            var exec=conn.query(sqlInsertIdeal,data,function(err,result){
                conn.release();
    
                if(err){
                    console.log("쿼리시에 오류발생");
                    console.dir(err);
                    // callback(err,null);
                }
                // callback(null,result);
            });
        })
        res.redirect("/rank");
    }
}

module.exports.ranking=ranking;
module.exports.init=init;
