$(document).ready(function(){
    $.ajax({
        url:'/session',
        dataType:'json',
        type:'POST',
        data:{},
        success:function(result){
            final_path=result[0].img_path;
            $(".select_page #Win").attr("src",result[0].img_path);
            $(".select_page #Win").attr("id","ideal");
            $("#ideal").attr('src',result[0].img_path);
        }
    })
});