var sqlgirlimg='SELECT my_ideal, ideal_name FROM users WHERE nickname=?;';
var pool;

function init(pool_){
    pool=pool_;
}
function mypage_load(req,res){
    prams=[];
    prams.push(req.body.nickname);
    console.log(req.body.nickname);
    
    pool.getConnection( function(err, connection) 
    {  
        if (err) 
            throw err;
        else 
        {
            
            // 커넥션 사용
            connection.query(sqlgirlimg,prams, function(err, results) 
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
}

module.exports.mypage_load=mypage_load;
module.exports.init=init;
