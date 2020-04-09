$(document).ready(function(){

    var count=8;
    var count_v=count;
    var left_page="";
    var right_page="";

    // 첫 Start버튼 클릭 시
    $("#start").on("click",function(){
        $("#menu1 .box").empty();
        $("#menu1 .box").append("<div class='select'></div>");
        $("#menu1 .select").prepend("<div class='select_head'><h1>장르</h1></div>");
        $("#menu1 .select").append("<div class='select_page' id='left_page'><img id='girl' src='../images/girl/girl.PNG' alt='girl'><h4 id='left_text'>여자 편</h4><div>");
        $("#menu1 .select").append("<div class='select_page' id='right_page'><img id='man' src='../images/man/man.PNG' alt='man'><h4 id='right_text'>남자 편</h4><div>");
        $.ajax({
            url:'/start',
            dataType:'json',
            type:'POST',
            data:{result:true},
            success:function(result){

            }
        });
    });

    //여자 편 시작
    $(document).on("click","#girl",function(){
        $(".select_head h1").text(count+"강");
        $.ajax({
            url:'/start/first',
            dataType:'json',
            type:'POST',
            data:{pos:'girl'},
            success:function(result){
                $("#girl").attr("src",result[0].img_path);
                $("#girl").attr("id","left_girl");
                $(".select_page #left_text").text(result[0].name);
                left_page=result[0].name;
                $("#man").attr("src",result[1].img_path);
                $("#man").attr("id","right_girl");
                $(".select_page #right_text").text(result[1].name);
                right_page=result[1].name;
            }
        });
    });

    //여자 편
    $(document).on("click","#left_girl",function(){
        $("#left_girl").animate({
            width: "100%",
            height: "100%",
            opacity: 0.5
          },
          1000,function() {
            $("#left_girl").animate({
                width: "300px",
                height: "400px",
                opacity: 1.0
              },
              0);

              $.ajax({
                url:'/start/first/ing',
                dataType:'json',
                type:'POST',
                data:{pos:'left'},
                success:function(result){
                    if(result.status==='final'){
                        $(".select_head h1").text("우승");
                        $("#right_page").fadeOut(1500,'swing',function(){
                            $(this).remove();
                        });
                        setTimeout(function(){
                            $(".select_page").append('<div class="final_btn"><button id="final_btn" type="button" class="btn btn-primary">이상형 생성</button></div>');
                        },1700);

                        //id 변경해서 클릭 이번트제거
                        $("#left_girl").attr("id","Win");
                        $("#right_girl").attr("id","Lose");
                    }
                    else{
                        $("#left_girl").attr("src",result[0].img_path);
                        $(".select_page #left_text").text(result[0].name);
                        left_page=result[0].name;
                        $("#right_girl").attr("src",result[1].img_path);
                        $(".select_page #right_text").text(result[1].name);
                        right_page=result[1].name;
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
    });

    $(document).on("click","#right_girl",function(){
        $("#right_girl").animate({
            width: "100%",
            height: "100%",
            opacity: 0.5
          },
          1000,function() {
            $("#right_girl").animate({
                width: "300px",
                height: "400px",
                opacity: 1.0
              },
              0);

              $.ajax({
                url:'/start/first/ing',
                dataType:'json',
                type:'POST',
                data:{pos:'right'},
                success:function(result){
                    if(result.status==='final'){
                        $(".select_head h1").text("우승");
                        $("#left_page").fadeOut(1500,'swing',function(){
                            $(this).remove();
                        });
                        setTimeout(function(){
                            $(".select_page").append('<div class="final_btn"><button id="final_btn" type="button" class="btn btn-primary">이상형 생성</button></div>');
                        },1700);


                        //id 변경해서 클릭 이번트제거
                        $("#left_girl").attr("id","Lose");
                        $("#right_girl").attr("id","Win");
                    }
                    else{
                        $("#left_girl").attr("src",result[0].img_path);
                        $(".select_page #left_text").text(result[0].name);
                        left_page=result[0].name;
                        $("#right_girl").attr("src",result[1].img_path);
                        $(".select_page #right_text").text(result[1].name);
                        right_page=result[1].name;
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
    });

    // 남자 편 시작
    $(document).on("click","#man",function(){
        $(".select_head h1").text(count+"강");

        $.ajax({
            url:'/start/first',
            dataType:'json',
            type:'POST',
            data:{pos:'man'},
            success:function(result){
                $("#girl").attr("src",result[0].img_path);
                $("#girl").attr("id","left_man");
                $(".select_page #left_text").text(result[0].name);
                left_page=result[0].name;
                $("#man").attr("src",result[1].img_path);
                $("#man").attr("id","right_man");
                $(".select_page #right_text").text(result[1].name);
                right_page=result[1].name;
            }
        });
    });

    //남자 편
    $(document).on("click","#left_man",function(){
        $("#left_man").animate({
            width: "100%",
            height: "100%",
            opacity: 0.5
          },
          1000,function() {
            $("#left_man").animate({
                width: "300px",
                height: "400px",
                opacity: 1.0
              },
              0);

              $.ajax({
                url:'/start/first/ing',
                dataType:'json',
                type:'POST',
                data:{pos:'left'},
                success:function(result){
                    if(result.status==='final'){
                        $(".select_head h1").text("우승");
                        $("#right_page").fadeOut(1500,'swing',function(){
                            $(this).remove();
                        });
                        setTimeout(function(){
                            $(".select_page").append('<div class="final_btn"><button id="final_btn" type="button" class="btn btn-primary">이상형 생성</button></div>');
                        },1700);

                        //id 변경해서 클릭 이번트제거
                        $("#left_man").attr("id","Win");
                        $("#right_man").attr("id","Lose");
                    }
                    else{
                        $("#left_man").attr("src",result[0].img_path);
                        $(".select_page #left_text").text(result[0].name);
                        left_page=result[0].name;
                        $("#right_man").attr("src",result[1].img_path);
                        $(".select_page #right_text").text(result[1].name);
                        right_page=result[1].name;
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
    });

    $(document).on("click","#right_man",function(){
        $("#right_man").animate({
            width: "100%",
            height: "100%",
            opacity: 0.5
          },
          1000,function() {
            $("#right_man").animate({
                width: "300px",
                height: "400px",
                opacity: 1.0
              },
              0);

              $.ajax({
                url:'/start/first/ing',
                dataType:'json',
                type:'POST',
                data:{pos:'right'},
                success:function(result){
                    if(result.status==='final'){
                        $(".select_head h1").text("우승");
                        $("#left_page").fadeOut(1500,'swing',function(){
                            $(this).remove();
                        });
                        setTimeout(function(){
                            $(".select_page").append('<div class="final_btn"><button id="final_btn" type="button" class="btn btn-primary">이상형 생성</button></div>');
                        },1700);

                        //id 변경해서 클릭 이번트제거
                        $("#left_man").attr("id","Lose");
                        $("#right_man").attr("id","Win");
                    }
                    else{
                        $("#left_man").attr("src",result[0].img_path);
                        $(".select_page #left_text").text(result[0].name);
                        left_page=result[0].name;
                        $("#right_man").attr("src",result[1].img_path);
                        $(".select_page #right_text").text(result[1].name);
                        right_page=result[1].name;
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
    });

    $(document).on("click",".final_btn #final_btn",function(){
        $(".select").fadeOut(500,'swing',function(){

            $("#container").css("background-color","white");
            $(".box").prepend("<div class='roding_page'><img id='roding_img' src='../images/loading.gif' alt='roading'><h3>이상형을 생성중입니다.</h3><div>");
            setTimeout(function(){
                $(".select").fadeIn(0,'swing',function(){
                    $("#container").css("background-color","whitesmoke");
                    $(".roding_page").remove();
                    $(".select_head h1").text("나의 이상형");
                    $(".select_page h4").remove();
                    $(".final_btn").before(
                    '<form id="rank_form" method="post" action="/process/ranking"><input type="name" class="form-control" id="ideal_name" name="ideal_name" placeholder="생성 된 이상형의 이름을 지어주세요"></input><button id="Ranking registration" type="submit" class="btn btn-default">랭킹 등록</button></form>');
                    $(".select_page #Win").attr("src","../images/ideal.PNG");
                    $(".select_page #Win").attr("id","ideal");
                    $(".final_btn #final_btn").text("이상형 재생성");
                    $(".final_btn #final_btn").attr("id","create_retry");
                });
            },2000);
        });

    });

    $(document).on("click","#create_retry",function(){
       location.reload();
    });

});
