$(document).ready(function(){
    // 로그인시 쿠키 처리
    var user_cookie=$.cookie('user');
    var index_s=user_cookie.indexOf("nickname")+11;
    var index_e=user_cookie.indexOf("authorized")-3;
    var user_nickname="";
    for(var i=index_s;i<index_e;i++){
        user_nickname+=user_cookie[i];
    }
    console.log(user_nickname);
    
    if(user_cookie){
        $("#auth").text("Logout");
        $("#auth").attr("href","/process/logout");
        $("#sign_nickname").text(user_nickname+" 님");
        $("#sign_nickname").attr("href","/mypage");

        $("#nav_auth").attr("href","/mypage");
        $("#nav_auth").text("마이페이지");
        $("#nav_sign").attr("href","/process/logout");
        $("#nav_sign").text("로그아웃");
    }
    
});
Kakao.init('1d49add348926bb539885c56954b946a');
console.log(Kakao.isInitialized());

Kakao.API.request({
    url: '/v1/api/talk/profile',
    success: function(response) {
        $("#auth").text("Logout");
        $("#auth").attr("href","javascript:logoutWithKakao()");
        $("#nickname").text(response.nickName+" 님");
        $("#profile").attr("src",response.profileImageURL);
      console.log(response);
    },
    fail: function(error) {
      console.log(error);
    }
  });

  Kakao.init('1d49add348926bb539885c56954b946a');
      function loginWithKakao() {
        Kakao.Auth.login({
          success: function(authObj) {
            alert("Kakao 회원으로 로그인합니다.");
            location.href='/';
          },
          fail: function(err) {
            alert(JSON.stringify(err))
          },
        })
      }

      function logoutWithKakao(){
        if (!Kakao.Auth.getAccessToken()) {
            console.log('Not logged in.');
            return;
          }
          Kakao.Auth.logout(function() {
            console.log(Kakao.Auth.getAccessToken());
            alert("Kakao 회원 로그아웃");
            location.href='/';
          });
      }

      

     

