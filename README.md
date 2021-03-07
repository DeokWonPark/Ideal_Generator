# Ideal Generator <img src="https://www.duckon.xyz/images/ideallogo_.PNG" width="70px" />

개발기간 - 2020. 03. 26 ~ 2020. 06. 24

**jQuery, HTML/CSS**를 사용하여 프론트엔드 기능 개발

**Node.js Express**를 사용한 웹서버 구축  <img src="https://www.duckon.xyz/images/express.png" width="30px" />

**MySQL** 데이터베이스를 구축하여 사용자 정보관리 <img src="https://www.duckon.xyz/images/MYSQL.png" width="30px" />

가상의 이미지를 생성하는 딥러닝 모델인 **StyleGAN**을 사용하여 이미지 생성 <img src="https://res.cloudinary.com/cloudinary/image/upload/new_cloudinary_logo_square.png" width="30px" />

[# Demo Video](https://www.youtube.com/watch?v=B2tjb92XHr0 )

[# 논문](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10499075 )


<br/><br/>
### 개요

1. [Purpose of the project](#Purpose-of-the-project)
2. [Development stack](#Development-stack)
3. [About The Project](#About-The-Project)
4. [프로젝트를 통해서 어려웠던 점 과 배운점](#프로젝트를-통해서-어려웠던-점-과-배운점)
5. [Reference](#Reference)







### Purpose of the project

- StyleGAN & 이상형 월드컵 게임을 이용하여 가상의 이상형 인물을 생성하는 웹 어플리케이션 제작이 목표
- StyleGAN 모델을 활용하여 부자연스럽지 않은 이미지 생성
- 사용자들의 취향을 좀 더 명확하게 파악하기위한 이상형 월드컵 게임 제공





  

  

### Development stack

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PD2yAr4Tt4TG62BatFqSltJmYLO1_DFUqA&usqp=CAU" width="50px" />              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTAi6Ah3SwQOrGOrMCj_yF6SgNR_wgM8rJlw&usqp=CAU" width="43px" />              <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F998A7A4E5C04054A3B" width="50px" />        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="50px" />        <img src="https://www.duckon.xyz/images/express.png" width="50px" />        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/TensorFlowLogo.svg/1200px-TensorFlowLogo.svg.png" width="50px" />



  

  

### About The Project

- 진행방법

  - 순위 생성 : Web상에서 이상형 월드컵을 통해 순위 생성
  - 순위를 기반으로 Deep Learning 서버로 데이터 전송 
  - 이미지를 합성한 결과를 사용자에게 전송




  



#### Image Generation with StyleGAN

1. **이미지 전처리**

   - LANDMARKS MODEL을 이용하여 face detection후 image align하여 1024\*1024 image 생성

   ​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/img_preprocessing.PNG" width="600px" />

   - encoder를 이용해서 image를 latent representations로 변환	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/img_preprocessing2.PNG" width="700px" />

   

2.  **style mixing**

   - 자연스러운 합성을 위해 image를 Coarse, Middle, Fine style별로 style mixing 진행

   ​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/stylemixing.PNG" width="700px" />

   

3. **이미지 세부사항 조정**

   - Direction vector를 이용해 생성된 이미지의 세부 특징을 조정

   ​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/directionVector.PNG" width="500px" />





#### WEB Application

#### 		MAIN Page 

​	`Desktop Page`

​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/main.png" width="800px" />        



​	`Moblie Page`

​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/mobile.PNG" width="700px" />

----



#### 	Game Page

​	`총 32강의 월드컵 게임을 진행하여 순위별로 가중치를 딥러닝 서버에 전송하여 가상의 이미지를 생성`

​	`이상형월드컵에 사용된 이미지를 모두 Gif로 구성하여 좀 더 정확한 특징을 찾아내려고 노력했다.`



​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/game.png" width="800px" />        





----



#### 	Image generation Page

​	`선택한 가중치 정보를 바탕으로 생성된 이상형이미지`

​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/result.PNG" width="800px" />        



----



#### 	Style modification Page

​	`Direction Vector를 이용해 생성된 결과이미지를 자신의 취향에 맞게 수정이 가능하도록 만들었다.`

​	<img src="https://raw.githubusercontent.com/DeokWonPark/Ideal_Generator/master/readmeImg/result_change.PNG" width="800px" />        



  

  





### 프로젝트를 통해서 어려웠던 점, 배운점

1. Node.js 웹 서버와 MySQL 데이터베이스 서버 연결

   - Node js mysql모듈의  createPool()을 사용하여 연결을 초기화하고, getConnection()을 통해서 연결을 맺어 Query를 실행한다.

     
   
     ```javascript
     const mysql=require('mysql');
     const pool=mysql.createPool({
         connectionLimit:20,
         host:'localhost',
         user:'root',
         password:'apmsetup',
         database:'appdo_db',
         debug:false,
     });
     
     pool.getConnection( function(err, connection) 
         {  
             if (err) 
                 throw err;
             else 
             {
               console.log("선택된 장르:"+req.body.pos);
                 if(req.body.pos==='girl'){
                   sqlquery=sqlgirlimg;
                 }
               else if(req.body.pos==='man'){
                     sqlquery=sqlmanimg;
                 }
     
                 connection.query(sqlquery,prams, function(err, results) 
                 {
                     if (err) 
                         throw err;
                     else 
                         console.log(results);
                         res.send(results);
                 });
                 connection.release();
                 
             }
         });
     ```
     
  
     
   
   

### Reference

- [StyleGAN](https://blog.lunit.io/2019/02/25/a-style-based-generator-architecture-for-generative-adversarial-networks/)
- [PIKU](https://www.piku.co.kr/)

