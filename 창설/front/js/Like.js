
$(document).ready(function() { 
    // alert("로딩 완료");
    // rank url 정보가져와서 남자랭크 여자랭크 구분하면 됨
    $.ajax({
        url:'/process/load_rank',
        dataType:'json',
        type:'POST',
        traditional : true,
        data:{},
        success:function(result){
            for( var i=0;i<result.length;i++){
                if(i==0){
                    $('#NUMBER_1 .character_img img').attr('src',result[i].my_ideal);
                    $('#NUMBER_1 #p1').text('*생성자 :'+result[i].nickname);
                    $('#NUMBER_1 #p2').text('*이름: '+result[i].ideal_name);
                    $('#NUMBER_1 .character_like_num').text(result[i].like_num);
                }
                else{
                    var divs=$('#container_rank').clone().attr('id',"container_rank_copy");
                    $('body').append(divs);
                    var id='NUMBER_'+(i+1);

                    $('#container_rank_copy #NUMBER_1').attr('id',id);
                    $('#'+id+' #tr1').text("#NUMBER"+(i+1));
                    $('#'+id+' .character_img img').attr('src',result[i].my_ideal);
                    $('#'+id+' #p1').text('*생성자 :'+result[i].nickname);
                    $('#'+id+' #p2').text('*이름: '+result[i].ideal_name);
                    $('#'+id+' .character_like_num').text(result[i].like_num);
                }
            }
        }
    });
    
    var btn_num=4;
    $(document).on("click",".character_like_btn",function(event){
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

            var nickname=$('#'+click_id +' #p1').text().split(':');
            console.log(nickname[1]);
            $.ajax({
                url:'/process/update_like',
                dataType:'json',
                type:'POST',
                traditional : true,
                data:{nickname:nickname[1]},
                success:function(result){
                    
                }
            });
            
            event.stopPropagation();
        });
    });
});