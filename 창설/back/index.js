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

app.get('/',(req,res) => {
    res.sendFile((path.join(__dirname,"../front"))+"/Worldcup.html");
});

app.get('/login',(req,res) => {
    res.sendFile((path.join(__dirname,"../front"))+"/login.html");
});

app.get('/adduser',(req,res) => {
    res.sendFile((path.join(__dirname,"../front"))+"/adduser.html");
});

app.get('/rank',(req,res) => {
    res.sendFile((path.join(__dirname,"../front"))+"/rank_page.html");
});

app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');

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

var worldcup=require('./routes/worldcup');
var user=require('./routes/user');
worldcup.init(pool);
user.init(pool);

////////////////////////////////////////////////////////////////

// 라우팅
var router=express.Router();

var route_loader=require('./routes/route_loader');
route_loader.init(app,router);


app.use('/',router);
////////////////////////////////////////////////////////////

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