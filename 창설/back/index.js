var express=require('express')
    ,http=require('http')
    ,path=require('path');

var bodyparser=require("body-parser")
    ,static=require("serve-static");

var expressErrorHandler=require("express-error-handler");

var cookieparser=require("cookie-parser");
var session=require("express-session");

var mongo=require('mongodb').MongoClient;
var mongoose=require('mongoose');

var crypto = require('crypto');

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

var database;
var userSchema;
var userModel;

//데이터베이스 연결
//
function connectiondb(){
    var databaseURL='mongodb://localhost:27017/local';

    console.log("데이터베이스 연결을 시도합니다.");
    mongoose.Promise=global.Promise;
    mongoose.connect(databaseURL);
    database=mongoose.connection;

    database.on('error',console.error.bind(console,'mongoose connection error'));
    database.on('open',function(){
        console.log("데이터베이스에 연결되었습니다. "+databaseURL);
        createUserSchema();
    });
    database.on('disconnected',function(){
        console.log('연결이 끊어졌습니다. 5초후에 다시 연결합니다.');
        setInterval(connectiondb,5000);
    });
}

 // 데이터베이스 스키마 정의 및 모델생성(비밀번호 암호화)
 //
function createUserSchema(){

    userSchema=mongoose.Schema({
        id:{type:String,required:true,unique:true},
        hashed_password:{type:String,required:true,unique:true},
        salt:{type:String,required:true},
        name:{type:String,index:'hashed'},
        age:{type:Number,'default':-1},
        created_at:{type:Date,index:{unique:false},'default':Date.now},
        updated_at:{type:Date,index:{unique:false},'default':Date.now},
    });

    userSchema.virtual('password').set(function(password){
        this._password=password;
        this.salt=this.makeSalt();
        this.hashed_password=this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

    userSchema.method('encryptPassword',function(plainText,inSalt){
        if(inSalt){
            return crypto.createHmac('sha1',inSalt).update(plainText).digest('hex');
        }
        else{
            return crypto.createHmac('sha1',this.salt).update(plainText).digest('hex');
        }
    });

    userSchema.method('makeSalt',function(){
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

    userSchema.method('authenticate',function(plainText,inSalt,hashed_password){
        if(inSalt){
            return this.encryptPassword(plainText,inSalt) === hashed_password;
        }
        else{
            return this.encryptPassword(plainText) === hashed_password;
        }
    });

    userSchema.static('findById',function(id,callback){
        return this.find({id:id},callback);
    });

    userModel=mongoose.model('users5',userSchema);
}

// 데이터베이스에 사용자 추가 
//
function addUser(database,id,password,name,callback){
    var user=new userModel({'id':id,'password':password,'name':name});
    user.save(function(err){
        if(err){
            callback(err,null);
            return;
        }

        console.log("사용자 데이터 추가함!!");
        callback(null,user);
    });
}

//로그인시 사용자 인증과정
//
function authUser(database,id,password,callback){

    userModel.findById(id,function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        if(result.length>0){
            var user=new userModel({'id':id});
            var auth=user.authenticate(password,
                result[0]._doc.salt,result[0]._doc.hashed_password);
            if(auth){
                console.log("비밀번호가 일치함");
                callback(null,result);
            }
            else{
                console.log("일치하는 비밀번호가 없습니다.");
                callback(null,null);
            }
        }
        else{
            console.log("아이디 혹은 비밀번호 일치하는 사용자가 존재하지 않습니다.");
            callback(null,null);
        }
    });
}

var router=express.Router();

// main page 라우팅
// router.route('/process/Worldcup').post(function(req,res){

// })

// 로그인 페이지 라우팅
//
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
        if(database){
            authUser(database,pid,ppw,function(err,docs){
                if(err) throw err;

                if(docs){
                    req.session.user={
                        id:pid,
                        authorized:true,
                    }
                    var name=docs[0].name;
                    res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                    res.write("<h1>로그인 성공</h1>");
                    res.write("<div><p>사용자 이름 : "+name+"</p></div>");
                    res.write("<div><p>사용자 이름 : "+docs[0].id+"</p></div>");
                    res.write("<br><br><a href='/process/logout' >로그아웃</a>");
                    res.end();
                }
                else{
                    res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
                    res.write("<h1>로그인 실패</h1>");
                    res.write("<br><br><a href='/login.html' >다시 로그인 하기</a>");
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
//
router.route('/process/adduser').post(function(req,res){
    var pid=req.query.id || req.body.id;
    var ppw=req.body.password || req.query.password;
    var pname=req.body.name || req.query.name;

    if(database){
        addUser(database,pid,ppw,pname,function(err,result){
            if(err){
                throw err;
            }

            console.dir(result);
            res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
            res.write('<h2>사용자 추가 성공</h2>');
            res.write("<br><br><a href='/login.html'>로그인 하러가기! </a>");
            res.end(); 
        });
    }
    else{
        res.writeHead(200,{'Content-Type':'text/html ; charset=utf-8'});
        res.write('<h2>데이터베이스에 연결실패</h2>');
        res.write("<div><p>데이테베이스에 연결하지 못했습니다.</p></div>");
        res.end();
    }
})

// 로그아웃 페이지 라우팅
//
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
    connectiondb();
});