$(document).ready(function(){

    var count=32;
    var count_v=count;

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
        $("#man").attr("src","../images/girl2.PNG");
        $("#man").attr("id","suzy");
        $(".select_page #right_text").text("수지");
    });

    // 남자 편 시작
    $(document).on("click","#man",function(){
        $("#menu1 .select").prepend("<div class='select_head'><h1>"+count+"강</h1></div>");
        $("#girl").attr("src","../images/man1.PNG");
        $("#girl").attr("id","bokumpark");
        $(".select_page #left_text").text("박보검");
        $("#man").attr("src","../images/man2.PNG");
        $("#man").attr("id","dongsukma");
        $(".select_page #right_text").text("마동석");
    });
    

	//로고 클릭 시
	$(".logo_box").click(function(){
		// $("nav li").removeClass("on");
		// $(".content").removeClass("prev this next");
		// $("#container").css("max-width", "1200px");
	});
});
