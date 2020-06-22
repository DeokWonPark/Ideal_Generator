document.addEventListener("DOMContentLoaded", function(){
    var curWidth = $(window).width();
    if(curWidth < 768){
        document.getElementById('navigation_web').style.display = "none";
        $('body').css('padding-top','0px');

        $('.select_page').css('width','200px');
        $('.select_page').css('height','240px');
        $('.select_page img').css('width','130px');
        $('.select_page img').css('height','180px');
        $('#menu1 .select h4').css('margin','6px');
        $('#start').text("이상형 생성");
        $('.main_box h2').text("");
        $('.main_box h2').css("padding-top",'0px');
        $('.main_box #main_story').text("");
        $('.main_img_box img').attr('src','images/main_2.PNG');

        $('header').css('height','200px');
        $('header .head-line').css('margin-top','70px');
    }
    else{
        document.getElementById('navigation_app').style.display = "none";
        $('body').css('padding-top','150px');

        $('.select_page').css('width','400px');
        $('.select_page').css('height','470px');
        $('.select_page img').css('width','300px');
        $('.select_page img').css('height','400px');
        $('#menu1 .select h4').css('margin','12px');
        $('#start').text("이상형 생성 START !");
        $('.main_box h2').css("padding-top",'60px');
        $('.main_box h2').text("당신의 이상형은 어떻게 생겼을까요?");
        $('.main_box #main_story').text("이상형 월드컵을 통해 자신만의 이상형을 생성해보세요!");
        $('.main_img_box img').attr('src','images/main.PNG');

        $('header').css('height','400px');
        $('header .head-line').css('margin-top','180px');
    }
});


window.addEventListener('resize', function(){
    var curWidth = $(window).width();
    if(curWidth < 768){
        document.getElementById('navigation_web').style.display = "none";
        $('body').css('padding-top','0px');
        document.getElementById('navigation_app').style.display = "block";

        $('.select_page').css('width','200px');
        $('.select_page').css('height','240px');
        $('.select_page img').css('width','130px');
        $('.select_page img').css('height','180px');
        $('#menu1 .select h4').css('margin','6px');

    }
    else{
        document.getElementById('navigation_app').style.display = "none";
        document.getElementById('navigation_web').style.display = "block";
        $('body').css('padding-top','150px');


        $('.select_page').css('width','400px');
        $('.select_page').css('height','470px');
        $('.select_page img').css('width','300px');
        $('.select_page img').css('height','400px');
        $('#menu1 .select h4').css('margin','12px');
    }
});


function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    // document.getElementById('ybar1').style.display = "none";
    // document.getElementById('ybar2').style.display = "none";
    // document.getElementById('ybar3').style.display = "none";
    document.getElementsByTagName("body")[0].style.opacity = "0.6";

}
  
  /* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById('ybar1').style.display = "block";
    // document.getElementById('ybar2').style.display = "block";
    // document.getElementById('ybar3').style.display = "block";
    document.getElementsByTagName("body")[0].style.opacity = "1.0";


}
