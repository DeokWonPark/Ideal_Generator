$(document).ready(function(){

    var count=8;
    var count_v=count;
    var left_page="";
    var right_page="";

    // 첫 Start버튼 클릭 시
    $("#start").on("click",function(){
        $("#menu1 .box").empty();
        $("#menu1 .box").append("<div class='select'></div>");
        $("#menu1 .select").append("<div class='select_page'><img id='girl' src='../images/girl/girl.PNG' alt='girl'><h4 id='left_text'>여자 편</h4><div>");
        $("#menu1 .select").append("<div class='select_page'><img id='man' src='../images/man/man.PNG' alt='man'><h4 id='right_text'>남자 편</h4><div>");
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
        $("#menu1 .select").prepend("<div class='select_head'><h1>"+count+"강</h1></div>");
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
                        alert("the end");


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
                        alert("the end");

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
        $("#menu1 .select").prepend("<div class='select_head'><h1>"+count+"강</h1></div>");

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
                        alert("the end");

                        
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
                        alert("the end");

                        
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

});
