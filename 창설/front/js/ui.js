
$(document).ready(function(){
    var select=[];
    var count=32;
    var count_v=count;
    var final_path="";
    
    //////////////////////////////////////////////////////////
    // 이상형 월드컵 로직
    var all_img;
    var all_bound;
    var remain_img;
    var random_index
    var random_index1;
    var random_index2;
    var prams=[];
    var final=false;

    function start(){
        all_bound=[];
        all_img=[];
        for(var i=1;i<=32;i++){
            all_bound.push(i);
        }
        for(var i=0;i<32;i++){
            random_index=Math.floor(Math.random()*all_bound.length);
            all_img.push(all_bound[random_index]);
            all_bound.splice(random_index,1);
        }
        console.log(all_img);
        remain_img=[];
        prams=[];
    }

    function start_first(pos){
        if(all_img.length===0 && remain_img.length===0){
            final=true;
        }
        if(pos==='left'){
            remain_img.push(prams[0]);
            if(final==true){
                select.push(prams[1]);
                select.push(prams[0]);
            }
            else
                select.push(prams[1]);
        }
        else if(pos==='right'){
            remain_img.push(prams[1]);
            if(final==true){
                select.push(prams[0]);
                select.push(prams[1]);
            }
            else
                select.push(prams[0]);
        }
        console.log("select_index"+select);
        prams=[];
        if(all_img.length===0 && remain_img.length===1){
            final=true;
        }
        else{
            if(all_img.length==0){
                for (i of remain_img){
                    all_img.push(i);
                }
                remain_img=[];
            }
    
            random_index1=Math.floor(Math.random()*all_img.length);
            random_index2=Math.floor(Math.random()*(all_img.length-1));
    
            prams.push(all_img[random_index1]);
            all_img.splice(random_index1,1);
            prams.push(all_img[random_index2]);
            all_img.splice(random_index2,1);
            prams.sort(function(a,b){return a-b;});
            console.log("par  "+prams);
            console.log("all  "+all_img);
            console.log("remain  "+remain_img);
        }
        
    }

    //////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    // 이상형 월드컵 동작 함수
    function worldcup_start(url,gender){
        $(".select_head h1").text(count+"강");
        start_first(null);
        console.log("prams:" +prams[0]);
        $.ajax({
            url:url,
            dataType:'json',
            type:'POST',
            data:{pos:gender,pram1:prams[0],pram2:prams[1]},
            success:function(result){
                $("#girl").attr("src",result[0].img_path);
                $("#girl").attr("id","left_"+gender);
                $(".select_page #left_text").text(result[0].name);

                $("#man").attr("src",result[1].img_path);
                $("#man").attr("id","right_"+gender);
                $(".select_page #right_text").text(result[1].name);
            }
        });
        // $("#left_page").append("<input id='range_left' type='range' min='0' max='100' value='0' step='20'>");
        // $("#left_page").append('<div id="h4-container"><div id="h4-subcontainer_l"><h4>0<span></span></h4></div></div>');
        // $("#right_page").append("<input id='range_right' type='range' min='0' max='100' value='0' step='20'>");
        // $("#right_page").append('<div id="h4-container"><div id="h4-subcontainer_r"><h4>0<span></span></h4></div></div>');
        // $(".select").append("<input id='range_left' type='range' min='0' max='100' value='50' step='10'>");
        // $(".select").append('<div id="h4-container"><div id="h4-subcontainer_l"><h4>50<span></span></h4></div></div>');
    }
    $(document).on("change input","#range_left",function(){
        $(function() {
            var rangePercent = $('[id="range_left"]').val();
            $('#h4-subcontainer_l h4').html(rangePercent+'<span></span>');
            $('[id="range_left"], h4>span').css('filter', 'hue-rotate(-' + rangePercent + 'deg)');
            // $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(rangePercent/100)) + ')', 'left': rangePercent+'%'});
            $('#h4-subcontainer_l h4').css({'transform': 'translateX(-50% -20px) scale(' + (1+(rangePercent/100)) + ')', 'left': rangePercent+'%'});
        
        });
    });
    

    // function reset(){
    //     $("#range_left").remove();
    //     $("#h4-container").remove();
        
    //     $(".select").append("<input id='range_left' type='range' min='0' max='100' value='50' step='10'>");
    //     $(".select").append('<div id="h4-container"><div id="h4-subcontainer_l"><h4>50<span></span></h4></div></div>');
    // }
    

    function worldcup(url,gender,pos){
        var wid="#"+pos+"_"+gender;
        var lid;
        var pos_rev;
        if(pos==="left"){
            pos_rev="right";
        }
        else{
            pos_rev="left";
        }

        lid="#"+pos_rev+"_"+gender;
        start_first(pos);

        $(wid).animate({
            width: "100%",
            height: "100%",
            opacity: 0.5
          },
          1000,function() {
            $(wid).animate({
                width: $('#'+pos_rev+'_page img').width(),
                height: $('#'+pos_rev+'_page img').height(),
                opacity: 1.0
              },
              0);

              $.ajax({
                url:url,
                dataType:'json',
                type:'POST',
                data:{pos:gender,pram1:prams[0],pram2:prams[1]},
                success:function(result){
                    if(final==true){
                        $("#range_left").remove();
                        $("#h4-container").remove();
                        $("#range_right").remove();
                        $("#h4-container").remove();
                        $(".select_head h1").text("우승");
                        $("#"+pos_rev+"_page").fadeOut(1500,'swing',function(){
                            $(this).remove();
                        });
                        setTimeout(function(){
                            $(".select_page").append('<div class="final_btn"><button id="final_btn" type="button" class="btn btn-primary">이상형 생성</button></div>');
                        },1700);

                        //id 변경해서 클릭 이번트제거
                        $(wid).attr("id","Win");
                        $(lid).attr("id","Lose");
                    }
                    else{
                        // reset();
                        $("#left_"+gender).attr("src",result[0].img_path);
                        $(".select_page #left_text").text(result[0].name);
                        
                        $("#right_"+gender).attr("src",result[1].img_path);
                        $(".select_page #right_text").text(result[1].name);
                        
                        count_v=count_v-2;
                        if(count_v==0){
                            count=count/2;
                            count_v=count;
                            if(count==2)
                                $(".select_head h1").text("결승전");
                            else
                                $(".select_head h1").text(count+"강");
                        }
                    }
                }
            });
        });
    }

    ///////////////////////////////////////////////////

    // 첫 Start버튼 클릭 시
    $("#start").on("click",function(){
//         history.pushState(null, null, location.href);
//         window.onpopstate = function () {
//         history.go(1);
// };
        $("#menu1 .box").empty();
        $("#menu1 .box").append("<div class='select'></div>");
        $("#menu1 .select").prepend("<div class='select_head'><h1>장르</h1></div>");
        $("#menu1 .select").append("<div class='select_page' id='left_page'><img id='girl' src='../images/girl/girl.PNG' alt='girl'><h4 id='left_text'>여자 편</h4><div>");
        $("#menu1 .select").append("<div class='select_page' id='right_page'><img id='man' src='../images/man/man.PNG' alt='man'><h4 id='right_text'>남자 편</h4><div>");
        var curWidth = $(window).width();
        if(curWidth < 768){
            document.getElementById('navigation_web').style.display = "none";
            $('body').css('padding-top','0px');
    
            $('.select_page').css('width','200px');
            $('.select_page').css('height','235px');
            $('.select_page img').css('width','150px');
            $('.select_page img').css('height','200px');
        }
        start();
    });
//////////////////////////////
    //여자 편 시작
    $(document).on("click","#girl",function(){
        worldcup_start('/start/first','girl');
    });

    //여자 편
    $(document).on("click","#left_girl",function(){
        worldcup('/start/first',"girl","left");
    });

    $(document).on("click","#right_girl",function(){
        worldcup('/start/first',"girl","right");
    });
///////////////////////////////////////////////////


    // 남자 편 시작
    $(document).on("click","#man",function(){
        worldcup_start('/start/first','man');
    });

    //남자 편
    $(document).on("click","#left_man",function(){
        worldcup('/start/first',"man","left");
    });

    $(document).on("click","#right_man",function(){
        worldcup('/start/first',"man","right");
    });


////////////////////////////////////////////////////////


var age;
var makeup;
var hair;

    // 마지막 이상형 생성 부분
    $(document).on("click",".final_btn #final_btn",function(){
        // $('#final_btn').attr('disabled',true);
        $(".select").fadeOut(500,'swing',function(){

            $("#container").css("background","white");
            $(".box").prepend("<div class='roding_page'><img id='roding_img' src='../images/loading.gif' alt='roading'><h3>이상형을 생성중입니다.</h3><div>");
            $.ajax({
                url:'/start/create_py',
                dataType:'json',
                type:'POST',
                traditional : true,
                data:{select_index:select},
                success:function(result){
                    
                }
            });
            setTimeout(function(){
                $(".select").fadeIn(0,'swing',function(){
                    $("#container").css("background-color","whitesmoke");
                    $(".roding_page").remove();
                    $(".select_head h1").text("나의 이상형");
                    $(".select_page h4").remove();
                    $(".final_btn").before(
                    '<form id="rank_form" method="post" action="/process/ranking"><input type="name" class="form-control" id="ideal_name" name="ideal_name" placeholder="생성 된 이상형의 이름을 지어주세요"></input><input type="name" id="ideal_path" name="ideal_path"></input><button id="Ranking_registration" type="submit" class="btn btn-default">이상형 등록</button></form>');
                    // $("#ideal_path").attr('value',"sadsadsad");

                    $.ajax({
                        url:'/start/end',
                        dataType:'json',
                        type:'POST',
                        data:{},
                        success:function(result){
                            final_path=result.path;
                            $(".select_page #Win").attr("src",result.path);
                            $(".select_page #Win").attr("id","ideal");
                            $("#ideal").attr('src',result.path);
                            $("#ideal_path").attr('value',result.path);
                        }
                    });
                    $(".final_btn #final_btn").text("이상형 재생성");
                    $(".final_btn #final_btn").attr("id","create_retry");
                    
                    $('.select').append("<div><h4 id='sh4'>age</h4><input id='range_left' class='age' type='range' min='-10' max='10' value='0' step='1'></div>");
                    $('.select').append("<div><h4 id='sh4'>makeup</h4><input id='range_left' class='makeup' type='range' min='-10' max='10' value='0' step='1'></div>");
                    $('.select').append("<div><h4 id='sh4'>hair color</h4><input id='range_left' class='hair' type='range' min='-10' max='10' value='0' step='1'></div>");
                   
                });
            },2000);
        });
    });

    //이상형 재 생성
    $(document).on("click","#create_retry",function(){
        age=$('.age').val();
        makeup=$('.makeup').val();
        hair=$('.hair').val();
        $.ajax({
            url:'/start/trans',
            dataType:'json',
            type:'POST',
            data:{age:age,makeup:makeup,hair:hair,final_path:final_path},
            success:function(result){
                $("#ideal").attr("src", final_path+"?timestamp=" + new Date().getTime());
            }
        });
    });
 

});
