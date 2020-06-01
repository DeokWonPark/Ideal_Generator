var pool;
var net = require('net');

function init(pool_){
    pool=pool_;
}

var sqlgirlimg = 'SELECT name, img_path FROM girl_gif WHERE id=? OR id=?';
var sqlmanimg = 'SELECT name, img_path FROM man_gif WHERE id=? OR id=?';
var sqlidealimg= 'SELECT name, img_path FROM ideal WHERE id=?';

var sqlquery;
var prams=[];

function start_first(req,res){
    prams=[];
    prams.push(req.body.pram1);
    prams.push(req.body.pram2);
    console.log(req.body.prams);
    
    pool.getConnection( function(err, connection) 
    {  
        if (err) 
            throw err;
        else 
        {
            // 남자 여자 장르 선택 db query
            console.log("선택된 장르:"+req.body.pos);
            if(req.body.pos==='girl'){
                sqlquery=sqlgirlimg;
            }
            else if(req.body.pos==='man'){
                sqlquery=sqlmanimg;
            }

            // 커넥션 사용
            connection.query(sqlquery,prams, function(err, results) 
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

function end(req,res){
    var param=1;
    pool.getConnection( function(err, connection) 
        {  
            if (err) 
                throw err;
            else 
            {
                // 커넥션 사용
                connection.query(sqlidealimg,param, function(err, results) 
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

function create_py(req,res){
    var client = new net.Socket();
    client.connect(55555,'127.0.0.1',function(){
        console.log("Connected");
        client.write('Hello, server');
    });

    client.on('data',function(data){
        console.log('Received: '+data);
        client.destroy();
    });
}

module.exports.create_py =create_py;
module.exports.init=init;
module.exports.start_first=start_first;
module.exports.end=end;