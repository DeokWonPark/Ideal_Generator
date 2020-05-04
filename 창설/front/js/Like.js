var btn_num=4;
$(function(){
    $('.character_like_btn').click(function(event){
        var click_id=$(this).closest("table").attr("id");
        console.log(click_id);
        var num = $('#'+click_id+' .character_like_num').text();
        $('#'+click_id+' .character_like_num').text(Number(num)+1);

        $('#'+click_id+' .character_like_btn img').animate({
            height:"28px",
            opacity:0.5
        },200,function(){
            $('#'+click_id+' .character_like_btn img').animate({
                height:"30px",
                opacity:1.0
            },300);
        });
            
        event.stopPropagation();
    });
    
});
