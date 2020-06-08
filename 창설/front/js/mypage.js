$(document).ready(function(){

    var user_cookie=$.cookie('user');
    var index_s=user_cookie.indexOf("nickname")+11;
    var index_e=user_cookie.indexOf("authorized")-3;
    var user_nickname="";
    for(var i=index_s;i<index_e;i++){
        user_nickname+=user_cookie[i];
    }

    $.ajax({
        url:"/myideal",
        dataType:'json',
        type:'POST',
        data:{nickname:user_nickname},
        success:function(result){
            if(result[0].my_ideal!=null){
                $(".information_img img").attr("src",result[0].my_ideal);
                $(".information_box_mid #i_name").text(result[0].ideal_name);
            }
        }
    });
    
});