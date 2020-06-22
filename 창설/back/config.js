module.exports={

    server_port : 80,

    route_info:[
        {file:'./user',path:'/process/login',method:'login',type:'post'},
        {file:'./user',path:'/process/adduser',method:'signup',type:'post'},
        {file:'./user',path:'/process/logout',method:'logout',type:'get'},
        {file:'./worldcup',path:'/start/first',method:'start_first',type:'post'},
        {file:'./worldcup',path:'/start/end',method:'end',type:'post'},
        {file:'./worldcup',path:'/start/create_py',method:'create_py',type:'post'},
        {file:'./ranking',path:'/process/ranking',method:'ranking',type:'post'},
        {file:'./ranking',path:'/process/load_rank',method:'load_rank',type:'post'},
        {file:'./ranking',path:'/process/update_like',method:'update_like',type:'post'},
        {file:'./ranking',path:'/process/rank_update',method:'rank_update',type:'post'},
        {file:'./mypage',path:'/myideal',method:'mypage_load',type:'post'},
    ],

}