var express=require('express')
    ,http=require('http')
    ,path=require('path');

var bodyparser=require("body-parser")
    ,static=require("serve-static");

var expressErrorHandler=require("express-error-handler");

var cookieparser=require("cookie-parser");
var session=require("express-session");

var app=express();

app.set('port',process.env.PORT || 3000);

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(static(path.join(__dirname,"../front")));

app.use(cookieparser());

app.use(session({
    secret:'my key',
    resave:true,
    saveUninitialized:true,
}));

/////////////////////////////////////////////////////////////
//데이터베이스 연결

var mysql=require('mysql');
var pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'111111',
    database:'img_data',
    debug:false,
});

var sqlgirlimg = 'SELECT name, img_path FROM girl WHERE id=? OR id=?';
var sqlmanimg = 'SELECT name, img_path FROM man WHERE id=? OR id=?';

////////////////////////////////////////////////////////////////
// 회원추가 

function addUser(id,name,password,nickname,gender,callback){

    pool.getConnection(function(err,conn){
        if(err){
            if(conn){
                conn.release();
            }
            callback(err,null);
            return;
        }
        var data={id:id,password:password,name:name,nickname:nickname,gender:gender};

        var exec=conn.query('insert into users set ?',data,function(err,result){
            conn.release();

            if(err){
                console.log("쿼리시에 오류발생");
                console.dir(err);
                callback(err,null);
            }
            callback(null,result);
        });
    })
   
}

//로그인시 사용자 인증과정

function authUser(id,password,callback){
    pool.getConnection(function(err,conn){
        if(err){
            if(conn){
                conn.release();

            }
            callback(err,null);
            return;
        }
        
        var colums=['id','name','nickname'];
        var tablename='users';

        var exec=conn.query('select ?? from ?? where id=? and password=?'
        ,[colums,tablename,id,password],function(err,rows){
            conn.release();

            if(rows.length>0){
                console.log('일치하는 사용자를 찾음');
                callback(null,rows);
            }
            else{
                console.log('일치하는 사용자를 찾지못함');
                callback(null,null);
            }
        });
    })
}


////////////////////////////////////////////////////

// 라우팅
var router=express.Router();

var all_img;
var remain_img;
var random_index1;
var random_index2;
var sqlquery;
var prams=[];

router.route('/start').post(function(req,res){
    all_img=[1,2,3,4,5,6,7,8];
    remain_img=[];
    prams=[];
});

router.route('/start/first').post(function(req,res){

    random_index1=Math.floor(Math.random()*all_img.length);
    random_index2=Math.floor(Math.random()*(all_img.length-1));
    console.log(random_index1,random_index2);

    prams.push(all_img[random_index1]);
    all_img.splice(random_index1,1);
    prams.push(all_img[random_index2]);
    all_img.splice(random_index2,1);
    prams.sort();
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
});


router.route('/start/first/ing').post(function(req,res){

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
        }

        random_index1=Math.floor(Math.random()*all_img.length);
        random_index2=Math.floor(Math.random()*(all_img.length-1));
        console.log(random_index1,random_index2);

        prams.push(all_img[random_index1]);
        all_img.splice(random_index1,1);
        prams.push(all_img[random_index2]);
        all_img.splice(random_index2,1);
        prams.sort();
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
})

////////////////////////////////////////////////////////////



// 로그인 페이지 라우팅
router.route('/process/login').post(function(req,res){

    var pid=req.query.id || req.body.id;
    var ppw=req.query.password || req.body.password;
    
    if(req.session.user){
        console.log("이미 로그인 된 상태입니다.");
        res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
        res.write("<h1>로그인 실패</h1>");
        res.write("<h4> 이미 로그인 된 상태입니다</h4>");
        res.end();
    }
    else{
        if(pool){
            authUser(pid,ppw,function(err,rows){
                if(err){
                    console.error('사용자 로그인 중 오류발생'+err.stack);
                    res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                    res.write('<h2>사용자 로그인 중 오류발생</h2>');
                    res.write("<p>"+err.stack+"</p>");
                    res.end();
                }
                if(rows){
                    console.dir(rows);
    
                    var username=rows[0].name;
                    res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                        res.write("<h1>로그인 성공</h1>");
                        res.write("<div><p>사용자 이름 : "+username+"</p></div>");
                        res.write("<div><p>사용자 아이디 : "+pid+"</p></div>");
                        res.end();
                }
            })
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
            res.write('<h2>데이터베이스에 연결실패</h2>');
            res.write("<div><p>데이테베이스에 연결하지 못했습니다.</p></div>");
            res.end();
        }
    }
})

// 회원가입 페이지 라우팅

router.route('/process/adduser').post(function(req,res){
    var pid=req.query.id || req.body.id;
    var ppw=req.body.password || req.query.password;
    var pname=req.body.name || req.query.name;
    var pnickname=req.body.nickname || req.query.nickname;
    var pman=req.body.man || req.query.man;
    var gender="";
    
    if(pman==="option1")
        gender="남자";
    else
        gender="여자";

    if(pool){
        addUser(pid,pname,ppw,pnickname,gender,function(err,result){
            if(err){
                console.error('사용자 추가도중 오류발생'+err.stack);

                res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                res.write('<h2>사용자 추가중 오류발생</h2>');
                res.write("<p>"+err.stack+"</p>");
                res.end();

                return;
            }

            if(result){
                console.dir(result);

                var insertid=result.insertId;
                console.log("추가한 레코드의 아이디 :"+insertid);
                res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                res.write('<h2>사용자 추가성공</h2>');
                res.end();
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                res.write('<h2>사용자 추가실패</h2>');
                res.end();
            }
        })
    }
    else{
        res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
        res.write('<h2>데이터베이스에 연결실패</h2>');
        res.write("<div><p>데이테베이스에 연결하지 못했습니다.</p></div>");
        res.end();
    }
})

// 로그아웃 페이지 라우팅

router.route('/process/logout').get(function(req,res){
    if(req.session.user){
        console.log("로그아웃 합니다");
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/login.html');
        });
    }
    else{
        console.log("로그인 되어있지 않습니다.");
        res.redirect('/login.html');
    }
})

app.use('/',router);

var errorhandler=expressErrorHandler({
    static:{
        '404':'../front/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorhandler);

http.createServer(app).listen(app.get('port'),function(){
    console.log("server RUN : "+app.get('port'));
});