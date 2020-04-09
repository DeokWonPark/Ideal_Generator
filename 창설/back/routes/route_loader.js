var route_loader={};

var config=require('../config');

route_loader.init=function(app,router){
    return initRoutes(app,router);
}

function initRoutes(app,router){

    var info_len=config.route_info.length;
    console.log("정의된 라우팅 모델의 수 : "+info_len);

    for(var i=0;i<info_len;i++){
        var curitem=config.route_info[i];

        var curmodule=require(curitem.file);

        //라우팅 처리
        if(curitem.type=='get'){
            router.route(curitem.path).get(curmodule[curitem.method]);
        }
        else if(curitem.type=='post'){
            router.route(curitem.path).post(curmodule[curitem.method]);
        }
        else{
            router.route(curitem.path).post(curmodule[curitem.method]);
        }
    }
    app.use('/',router);
}

module.exports=route_loader;