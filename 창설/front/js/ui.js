$(document).ready(function(){

    var count=32;
    var count_v=count;
    var left_page="";
    var right_page="";

    // 첫 Start버튼 클릭 시
    $("#start").on("click",function(){

        $("#menu1 .box").empty();
        $("#menu1 .box").append("<div class='select'></div>");
        $("#menu1 .select").append("<div class='select_page'><img id='girl' src='../images/girl.PNG' alt='girl'><h4 id='left_text'>여자 편</h4><div>");
        $("#menu1 .select").append("<div class='select_page'><img id='man' src='../images/man.PNG' alt='man'><h4 id='right_text'>남자 편</h4><div>");
    });

    //여자 편 시작
    $(document).on("click","#girl",function(){
        $("#menu1 .select").prepend("<div class='select_head'><h1>"+count+"강</h1></div>");
        $("#girl").attr("src","../images/girl1.PNG");
        $("#girl").attr("id","irene");
        $(".select_page #left_text").text("아이린");
        left_page='#irene';
        $("#man").attr("src","../images/girl2.PNG");
        $("#man").attr("id","suzy");
        $(".select_page #right_text").text("수지");
        right_page="#suzy";

        // 내부
        // $(document).on("change",left_page,function(){
            
        // })
        $(document).on("click",left_page,function(){
            alert("sss");
            $(left_page).attr("src","../images/girl3.PNG");
            $(left_page).attr("id","Kyungri");
            $(".select_page #left_text").text("경리");
            left_page='#Kyungri';
            $(right_page).attr("src","../images/girl4.PNG");
            $(right_page).attr("id","momo");
            $(".select_page #right_text").text("모모");
            right_page="#momo";
        });

        $(document).on("click",right_page,function(){
            alert(right_page);
        });
    });

    // 남자 편 시작
    $(document).on("click","#man",function(){
        $("#menu1 .select").prepend("<div class='select_head'><h1>"+count+"강</h1></div>");
        $("#girl").attr("src","../images/man1.PNG");
        $("#girl").attr("id","bokumpark");
        $(".select_page #left_text").text("박보검");
        left_page="#bokumpark";
        $("#man").attr("src","../images/man2.PNG");
        $("#man").attr("id","dongsukma");
        $(".select_page #right_text").text("마동석");
        right_page="#dongsukma";

        // 내부
        $(document).on("click",left_page,function(){
            alert(left_page);
        });

        $(document).on("click",right_page,function(){
            alert(right_page);
        });
    });

    
    

	//로고 클릭 시
	$(".logo_box").click(function(){
		$(location).attr('href','Worldcup.html');
	});
});
