module.exports={

    server_port : 3000,

    route_info:[
        {file:'./user',path:'/process/login',method:'login',type:'post'},
        {file:'./user',path:'/process/adduser',method:'signup',type:'post'},
        {file:'./user',path:'/process/logout',method:'logout',type:'get'},
        {file:'./worldcup',path:'/start/first',method:'start_first',type:'post'},
        {file:'./worldcup',path:'/start/end',method:'end',type:'post'},
        {file:'./ranking',path:'/process/ranking',method:'ranking',type:'post'},
    ],

}