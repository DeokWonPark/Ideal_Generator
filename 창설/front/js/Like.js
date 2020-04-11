$(function(){
    $('.character_like_btn').click(function(event){
        var num = $('.character_like_num').text();
        console.log(num);
        $('.character_like_num').text(Number(num)+1);
        event.stopPropagation();
    })
    
})
