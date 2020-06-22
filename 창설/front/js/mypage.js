var my_ideal;
var ideal_name;
var user_nickname="";
$(document).ready(function(){

    var user_cookie=$.cookie('user');
    var index_s=user_cookie.indexOf("nickname")+11;
    var index_e=user_cookie.indexOf("authorized")-3;
    
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
                my_ideal=result[0].my_ideal;
                ideal_name=result[0].ideal_name;
                $("#information_box_img img").attr("src",result[0].my_ideal);
                $("#information_box_inf").children().first().text("이름: "+result[0].ideal_name);
            }
        }
    });
    $(document).on("click","#rank_update",function(){
        $.ajax({
            url:"/process/rank_update",
            dataType:'json',
            type:'POST',
            data:{my_ideal:my_ideal, nickname:user_nickname, ideal_name:ideal_name},
            success:function(result){
                alert("랭킹등록 성공");
                window.location.href = "/rank";
            }
        });
    });

});
