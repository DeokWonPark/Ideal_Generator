document.addEventListener("DOMContentLoaded", function(){
    var curWidth = $(window).width();
    if(curWidth < 768){
        document.getElementById('navigation_web').style.display = "none";
        $('body').css('padding-top','0px');
    }
    else{
        document.getElementById('navigation_app').style.display = "none";
        $('body').css('padding-top','150px');
    }
});


window.addEventListener('resize', function(){
    var curWidth = $(window).width();
    if(curWidth < 768){
        document.getElementById('navigation_web').style.display = "none";
        $('body').css('padding-top','0px');
        document.getElementById('navigation_app').style.display = "block";

    }
    else{
        document.getElementById('navigation_app').style.display = "none";
        document.getElementById('navigation_web').style.display = "block";
        $('body').css('padding-top','150px');
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
