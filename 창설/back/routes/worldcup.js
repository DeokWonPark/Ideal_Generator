var pool;

function init(pool_){
    pool=pool_;
}

var sqlgirlimg = 'SELECT name, img_path FROM girl WHERE id=? OR id=?';
var sqlmanimg = 'SELECT name, img_path FROM man WHERE id=? OR id=?';
var sqlidealimg= 'SELECT name, img_path FROM ideal WHERE id=?';

var all_img;
var all_bound;
var remain_img;
var random_index
var random_index1;
var random_index2;
var sqlquery;
var prams=[];

function start(req,res){
    all_bound=[];
    all_img=[];
    for(var i=1;i<=16;i++){
        all_bound.push(i);
    }
    for(var i=0;i<8;i++){
        random_index=Math.floor(Math.random()*all_bound.length);
        all_img.push(all_bound[random_index]);
        all_bound.splice(random_index,1);
    }
    console.log(all_img);
    remain_img=[];
    prams=[];
}

function start_first(req,res){
    random_index1=Math.floor(Math.random()*all_img.length);
    random_index2=Math.floor(Math.random()*(all_img.length-1));
    console.log(random_index1,random_index2);

    prams.push(all_img[random_index1]);
    all_img.splice(random_index1,1);
    prams.push(all_img[random_index2]);
    all_img.splice(random_index2,1);
    prams.sort(function(a,b){return a-b; });
    console.log(prams);
    console.log(all_img);
    
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

function start_first_ing(req,res){
    // 선택된 index 저장
    console.log("선택된 위치:"+req.body.pos);
    if(req.body.pos==='left'){
        remain_img.push(prams[0]);
    }
    else if(req.body.pos==='right'){
        remain_img.push(prams[1]);
    }
    console.log("remain_img: ",remain_img);

    prams=[];

    if(all_img.length==0 && remain_img.length==1){
        res.send({status:"final"});
        console.log("The End");
    }
    else{
        // 1개의 강이 끝남 (강: 16강, 8강...)
        if(all_img.length==0){
            for (i of remain_img){
                all_img.push(i);
            }
            remain_img=[];
        }

        random_index1=Math.floor(Math.random()*all_img.length);
        random_index2=Math.floor(Math.random()*(all_img.length-1));
        console.log(random_index1,random_index2);

        prams.push(all_img[random_index1]);
        all_img.splice(random_index1,1);
        prams.push(all_img[random_index2]);
        all_img.splice(random_index2,1);
        prams.sort(function(a,b){return a-b; });
        console.log(prams);
        console.log(all_img);
        
        pool.getConnection( function(err, connection) 
        {  
            if (err) 
                throw err;
            else 
            {
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

module.exports.init=init;
module.exports.start=start;
module.exports.start_first=start_first;
module.exports.start_first_ing=start_first_ing;
module.exports.end=end;