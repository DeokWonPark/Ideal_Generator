var pool;

function init(pool_){
    pool=pool_;
}

var sqladduser = 'insert into users set ?';
var sqlauthuser = 'select ?? from ?? where id=? and password=?';

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

        var exec=conn.query(sqladduser,data,function(err,result){
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

        var exec=conn.query(sqlauthuser,[colums,tablename,id,password],function(err,rows){
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

function login(req,res){
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
                    req.session.user={
                        id:pid,
                        name:rows[0].name,
                        nickname:rows[0].nickname,
                        authorized:true,
                    }
                    res.cookie('user',{
                        id:pid,
                        name:rows[0].name,
                        nickname:rows[0].nickname,
                        authorized:true,
                    })
    
                    var name=rows[0].nickname;
                    var context={userid:pid,username:name};

                    res.redirect("/");
                    
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

}

function signup(req,res){
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
}

function logout(req,res){
    if(req.session.user){
        console.log("로그아웃 합니다");
        res.clearCookie('user');
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/');
        });
    }
    else{
        console.log("로그인 되어있지 않습니다.");
        res.clearCookie('user');
        res.redirect('/');
    }
}



module.exports.init=init;
module.exports.login=login;
module.exports.signup=signup;
module.exports.logout=logout;