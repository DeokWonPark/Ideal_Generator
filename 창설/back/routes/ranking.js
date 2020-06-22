var sqlInsertIdeal="update users set my_ideal=?, ideal_name=? where name=?;"
var sqlgirlrank="select * from girl_rank order by like_num DESC;"
var sqlupdatelike="update girl_rank set like_num=like_num+1 where nickname=?;"
var sqlinsertrank="insert into girl_rank(like_num,nickname,my_ideal,ideal_name) values(0,?,?,?);"
var pool;

function init(pool_){
    pool=pool_;
}
function ranking(req,res){
    var ideal_name=req.query.ideal_name || req.body.ideal_name;
    var ideal_path = req.query.ideal_path || req.body.ideal_path;
    console.log(ideal_name);
    console.log(ideal_path);
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
                return;
            }
    
            var data=["../images/ideal/ideal.PNG",ideal_name,req.session.user.name]
            var exec=conn.query(sqlInsertIdeal,data,function(err,result){
                conn.release();
    
                if(err){
                    console.log("쿼리시에 오류발생");
                    console.dir(err);
                    
                }
                
            });
        })
        res.redirect("/mypage");
    }
}

function load_rank(req,res){
    pool.getConnection( function(err, connection) 
    {  
        if (err) 
            throw err;
        else 
        {
            // 커넥션 사용
            connection.query(sqlgirlrank, function(err, results) 
            {
                if (err) 
                    throw err;
                else 
                    console.log(results);
                    console.log(results[0].rank);
                    res.send(results);
            });
            // 커넥션 반환 
            connection.release();
            
        }
    });
}

function update_like(req,res){
    pool.getConnection( function(err, connection) 
    {  
        var data=req.body.nickname;

        if (err) 
            throw err;
        else 
        {
            // 커넥션 사용
            connection.query(sqlupdatelike,data, function(err, results) 
            {
                if (err) 
                    throw err;
                else 
                    console.log(results);
            });
            // 커넥션 반환 
            connection.release();
        }
    });
}

function rank_update(req,res){
    pool.getConnection( function(err, connection) 
    {  
        var data=[];
        data[0]=(req.body.nickname);
        data[1]=(req.body.my_ideal);
        data[2]=(req.body.ideal_name);
        console.log(data);
        if (err) 
            throw err;
        else 
        {
            // 커넥션 사용
            connection.query(sqlinsertrank,data, function(err, results) 
            {
                if (err) 
                    throw err;
                else 
                    console.log(results);
                    res.send(results);
            });
            // 커넥션 반환 
            connection.release();
        }
    });
    // res.redirect("/rank");
}

module.exports.rank_update=rank_update;
module.exports.update_like=update_like;
module.exports.load_rank=load_rank;
module.exports.ranking=ranking;
module.exports.init=init;
