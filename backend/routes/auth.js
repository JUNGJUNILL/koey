const express = require('express');
const passport = require('passport');
const {isLoggedIn , vertifiyToken} = require('./middlewares')
const bcrypt = require('bcryptjs');
const pool = require('../DataBaseInfo');
const jwt = require('jsonwebtoken'); 
const axios = require('axios'); 
var qs = require('querystring');
const router = express.Router();
const nodemailer = require("nodemailer");



//유저정보 유지 
router.get('/',async (req,res)=>{
    try{
        //req.decoded 토큰 정보 저장 
        //req.user    세션정보 저장(일반 로그인)

        //로그인 했을 경우 
        
        let userResponse; 

        
        //jwt 로그인
        //토큰으로만 검증하기 때문에 서버 부하를 줄일 수 있지 않을까?
        if(req.cookies[process.env.COOKIE_SECRET]){
            console.log('jwt login'); 
            req.decoded = jwt.verify(req.cookies[process.env.COOKIE_SECRET],process.env.JWT_SECRET); 
            
            return res.json({nick:req.decoded.nick,
                             userid:req.decoded.userId,
                             levelId:req.decoded.userLevel,
                             levelName:req.decoded.userlevelName
                            }); 

        //카카오 로그인    
        }else if(req.cookies[process.env.KAKAO_COOKIE]){
            console.log('kakao login'); 
            const kakaoToken=req.cookies[process.env.KAKAO_COOKIE]; 
            userResponse = await axios({
                method: "GET",
                url: "https://kapi.kakao.com/v2/user/me",
                headers: {
                  Authorization: `Bearer ${kakaoToken}`
                }
              });
            return res.json({nick:userResponse.data.properties.nickname,
                             userid:`ｋａｋａｏ@$_${userResponse.data.id}`}); 
        
        //네이버 로그인
        }else if(req.cookies[process.env.NAVER_COOKIE]){
            //https://developers.naver.com/docs/login/profile/profile.md
            console.log('naver login'); 
            const naverToken = req.cookies[process.env.NAVER_COOKIE];
            userResponse = await axios({
                method: "GET",
                url: "https://openapi.naver.com/v1/nid/me",
                headers: {
                    Authorization: `Bearer ${naverToken}`
                    
                    
                }
              });
            return res.json({nick:userResponse.data.response.nickname,
                             userid:`ｎａｖｅｒ@$_${userResponse.data.response.id}`}); 
  
        //페이스북 로그인
        }else if(req.cookies[process.env.FACEBOOK_COOKIE]){
            console.log('facebook login')
            const facebookToken = req.cookies[process.env.FACEBOOK_COOKIE]; 
            userResponse = await axios({
                method: "GET",
                url: `https://graph.facebook.com/debug_token?input_token=${facebookToken}&access_token=1145587049279696|cec98856baf4b9d9bcbc2844855b2a26`,
       
              });
              
              const {data} = userResponse;
              return res.json({nick:data.data.user_id,loginType:'facebook'});

        //로그인 안함
        }else{
            console.log('not login')
            return res.json({nick:null,loginType:null,userid:null}); 
        }
       
    }catch(e){
        console.error(e);
        return res.json({nick:null,loginType:null,userid:null}); 
        //next(e); 
    }
}); 


//회원가입 
router.post('/join', async (req,res,next)=>{
    try{

        
        const {id,nickname,password,email,phone,address} = req.body.data; 
        const loginType='local'; 
        const hashedPassword = await bcrypt.hash(password,12); 
        let stringQuery = 'CALL US_INSERT_client'; 
            stringQuery = stringQuery.concat(`('${id}',`);
            stringQuery = stringQuery.concat(`'${nickname}',`);
            stringQuery = stringQuery.concat(`'${hashedPassword}',`);
            stringQuery = stringQuery.concat(`'${password}',`);
            stringQuery = stringQuery.concat(`'${password}',`);
            stringQuery = stringQuery.concat(`'${password}',`);
            stringQuery = stringQuery.concat(`'${email}',`);
            stringQuery = stringQuery.concat(`'${phone}',`);
            stringQuery = stringQuery.concat(`'${address}',`);
            stringQuery = stringQuery.concat(`'${loginType}')`);

        const clientInsert = await pool.query(stringQuery);
        console.log(stringQuery); 
        return res.status(200).json(clientInsert);  

    }catch(e){
        console.log(e); 
        next(e); 
    }
});

//단순 passport local
//로그인 
/*
router.post('/login',(req,res,next)=>{
    console.log(req.body.data); 
    passport.authenticate('local',(err,user,info)=>{
            //console.log('router/user/login==>',user); 
            if(err){
                    console.error(err); 
                    return next(err); 
            }

            if(info){
                    return res.status(401).send(info.reason); 
            }

            return req.login(user, async (loginErr)=>{

            try{
                if(loginErr){
                    console.log('loginERR==>' , loginErr); 
                    console.error(loginErr); 
                    return next(loginErr); 
            }
                

                let stringQuery = 'CALL US_SELECT_getUserInfo'; 
                stringQuery = stringQuery.concat(`('${user.userId}')`);

                const User = await pool.query(stringQuery); 
                delete User[0][0].password; 
                const userInfo =User[0][0]; 
                return res.json(userInfo); 
                 
                    
            }catch(e){
                    console.error(e);
                    next(e); 
            }
            });
    })(req,res,next); 

}); 
*/

//jwt 로그인
router.post('/login',async (req,res,next)=>{


            try{
                const {userId , password} = req.body.data;  
                const base64UserEmail = Buffer.from(userId).toString('base64'); 
                let loginType='local'; 
                let stringQuery = 'CALL US_SELECT_getUserInfo'; 
                stringQuery = stringQuery.concat(`('${base64UserEmail}',`);
                stringQuery = stringQuery.concat(`'${loginType}')`);
                console.log(stringQuery); 
                const user = await pool.query(stringQuery); 
                let result;
                let userInfo;

                
                if(!user[0][0]){

                    return res.status(401).json({
                        code:401,
                        message: '등록되지 않는 아이디 입니다.', 
                    }) ;

                }else{
                    result = await bcrypt.compare(password,user[0][0].password);
                    delete user[0][0].password;  
                    userInfo = user[0][0]; 
                }

             
            
                //로그인 성공 
                if(result){
                    const token = jwt.sign({
                                nick:userInfo.userNickName, 
                                userId:userInfo.userId,
                                userLevel:userInfo.levelId,
                                userlevelName:userInfo.levelName
                    },
                    process.env.JWT_SECRET, 
                    {
                        expiresIn :'120m', //분, 
                        issuer:'wah',  

                    }); 
                    //토큰을 쿠키에 저장함.                  
                    res.cookie(process.env.COOKIE_SECRET, token ,{httpOnly:true,
                                                                  secure:false, 
                                                                  domain: process.env.NODE_ENV === 'production' && '.jscompany.live'
                    }); 
                

                    return res.json({
                        code: 200, 
                        message:'토큰이 발급되었습니다.', 
                        token 
                    });

                }else{

                    return res.status(401).json({
                        code: 401, 
                        message:'비밀번호가 틀렸습니다.', 
                         
                    });
                }

            }catch(e){
                console.error(e); 
                next(e); 

            }

});

//카카오 로그인
router.get('/kakaoTest',async (req,res,next)=>{
    
    try{

      
        const kakaotoken = req.query.code;
        const redirectUri=process.env.NODE_ENV === 'production' ? 'http://api.jscompany.live:3333/api/auth/kakaoTest':'http://localhost:3333/api/auth/kakaoTest';
        const kakaoAccessToken = await axios({
            method: "POST",
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
              grant_type: "authorization_code",
              client_id: '8cf1ea216775ee5a5ff24a71b855846c',
              redirect_uri: redirectUri,
              code :kakaotoken,
            })
          });

          res.cookie(process.env.KAKAO_COOKIE, kakaoAccessToken.data.access_token ,{httpOnly:true,
            secure:false, 
            domain: process.env.NODE_ENV === 'production' && '.jscompany.live'
        }); 

          const redirectHome = process.env.NODE_ENV === 'production' ? 'http://jscompany.live/' : 'http://localhost:3001/'
          return res.redirect(redirectHome);
          
    }catch(e){
        console.error(e)
    }

}); 




//네이버 로그인
router.get('/naverLoginCallback',async (req,res,next)=>{

    try{
        const client_id = 'FQxK6vBp2RiL0gne54KV';
        const client_secret = 'V6rGNwgrBK';
        const redirectUri =process.env.NODE_ENV === 'production' ? "http://api.jscompany.live:3333/api/auth/naverLoginCallback":"http://localhost:3333/api/auth/naverLoginCallback";
        const redirectURI = encodeURI(redirectUri);
        const code  = req.query.code; 
        const state = req.query.state;

        const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
        const response = await axios({
            method: "GET",
            url: api_url,
            headers: {
                'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret
            }
          });

        const naverAccessToken = response.data.access_token;

          res.cookie(process.env.NAVER_COOKIE, naverAccessToken,{httpOnly:true,
            secure:false, 
            domain: process.env.NODE_ENV === 'production' && '.jscompany.live'
        }); 

        const redirectHome = process.env.NODE_ENV === 'production' ? 'http://jscompany.live/' : 'http://localhost:3001/'
        return res.redirect(redirectHome);

    }catch(e){
        console.error(e); 
    }

}); 

//페이스북 로그인
router.get('/facebookLogin',async (req,res,next)=>{

    try{ 
        
        const redirectUri =process.env.NODE_ENV === 'production' ? "http://api.jscompany.live:3333/api/auth/facebookLogin":"http://localhost:3333/api/auth/facebookLogin";

        const { data } = await axios({
            url: 'https://graph.facebook.com/v10.0/oauth/access_token',
            method: 'GET',
            params: {
                client_id: "1145587049279696",
                redirect_uri: redirectUri, 
                client_secret : 'cec98856baf4b9d9bcbc2844855b2a26',
                code: req.query.code,
            },
        });
     
        res.cookie(process.env.FACEBOOK_COOKIE, data.access_token,{httpOnly:true,
            secure:false, 
            domain: process.env.NODE_ENV === 'production' && '.jscompany.live'
        }); 

       const redirectHome = process.env.NODE_ENV === 'production' ? 'http://jscompany.live/' : 'http://localhost:3001/'
       return res.redirect(redirectHome);

    }catch(e){
        console.error(e); 
    }

}); 

//구글 로그인 
router.get('/googleLogin',async (req,res,next)=>{
    try{

    }catch(e){
        console.error(e); 
    }

}); 





//로그아웃 
router.get('/logOut',(req,res)=>{

    res.clearCookie(process.env.COOKIE_SECRET,{domain:process.env.NODE_ENV === 'production' && '.jscompany.live'}); 
    res.json('로그아웃'); 

}); 




//이메일 인증  
router.post('/sendemail',async (req,res)=>{

    try{

        const {userEmailAdress , eMailType} = req.body.data;  

        
        const userEmail=`${userEmailAdress}@${eMailType}`;
        const base64UserEmail=Buffer.from(userEmail).toString('base64');
        
        let stringQuery = 'CALL US_SELECT_CHECK_USER'; 
            stringQuery = stringQuery.concat(`('${base64UserEmail}')`);

        const user = await pool.query(stringQuery);
        console.log(stringQuery); 
        if(user[0][0]){

            return res.status(200).json({mailExistence:'이미 가입한 메일입니다.'});  
        }else{
            let transporter = nodemailer.createTransport({
                service:'gmail',
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: process.env.FROMEMAIL, 
                  pass: process.env.FROMEMAILPASS, 
                },
              });
    

              const joinUrl =process.env.NODE_ENV === 'production'
                            ?`http://jscompany.live/auth/join?pid=${base64UserEmail}`
                            :`http://localhost:3001/auth/join?pid=${base64UserEmail}`;

              let info = await transporter.sendMail({
                from: 'devjji1207@gmail.com', // sender address
                to: `${userEmailAdress}@${eMailType}`, // list of receivers
                subject: "좋소!(JS) 회원가입 인증", // Subject line
                text: "좋소!(JS) 회원가입 인증", // plain text body
                html: `<pre>
                            <b>좋소 회원가입 바로가기</b>
                            <a href='${joinUrl}'>${joinUrl}</a>
                       </pre>
                       `, // html body
              });
    
    
              return res.json({response:info.response,
                               userEmailAdress:userEmail}); 
    

        }
        
    }catch(e){
        console.error(e); 
    }

}); 


//닉네임 중복 확인 
router.post('/checkNickName',async (req,res)=>{
    
    try{

        const {chckNickName} = req.body.data;  

        let stringQuery = 'CALL US_SELECT_CHECK_NICKNAME'; 
        stringQuery = stringQuery.concat(`('${decodeURIComponent(chckNickName)}')`);
        console.log(stringQuery);
        const nickName = await pool.query(stringQuery);

        if(nickName[0][0]){

            return res.status(200).json({nickNameExistence:false});

        }else{
            return res.status(200).json({nickNameExistence:true});  
        }

    }catch(e){
        console.error(e); 
    }


}); 



//승진 심사 
router.post('/promotioncheck',async (req,res)=>{
    try{
        const {userid,userLevel,promotionLevel} = req.body.data;  
        let stringQuery = 'CALL US_SELECT_PromotionCondition'; 
        stringQuery = stringQuery.concat(`('${userid}')`);
        console.log(stringQuery);
        const promotionCondition = await pool.query(stringQuery);
        
        let postCount=0; //포스팅 갯수
        let promotionApproval='N'; 
        promotionCondition[0].map((v,i)=>{
            postCount+=v.postCount
        }); 

        if(postCount >= promotionLevel){
            promotionApproval='Y';
        }

        stringQuery=''; 
        stringQuery='CALL US_UPDATE_PromotionYN'
        stringQuery = stringQuery.concat(`('${userid}',`);
        stringQuery = stringQuery.concat(`'${promotionApproval}')`);
        console.log(stringQuery);
        await pool.query(stringQuery);
        
        return res.status(200).json({promotionApproval});  

    }catch(e){
        console.error(e); 
    }

});


//승진 가능 여부 데이터 가져오기 
router.post('/promotioncheckvalue',async (req,res)=>{
    try{
        const {userid,userLevel} = req.body.data; 

        let stringQuery = 'CALL US_SELECT_PromotionCondition'; 
        stringQuery = stringQuery.concat(`('${userid}')`);
        console.log(stringQuery);
        const promotionCheckValue = await pool.query(stringQuery);


        stringQuery=''; 
        stringQuery=stringQuery.concat('CALL US_SELECT_PromotionCheckValue')
        stringQuery=stringQuery.concat(`('${userid}')`);
        const promotionClickCheck = await pool.query(stringQuery);
        const promotionYN = promotionClickCheck[0][0].promotionYN; 


        let promotionLevel=0; 
        switch(userLevel){
            case 10 : promotionLevel=5; //사원
            break;
            
            case 20 : promotionLevel=15; //주임
            break;

            case 30 : promotionLevel=30; //대리
            break;

            case 40 : promotionLevel=50; //과장
            break;

            case 50 : promotionLevel=70; //차장
            break;

            case 60 : promotionLevel=100; //부장
            break;

            case 70 : promotionLevel=150; //이사
            break;

            default : promotionLevel=0;

        }

        let postCount=0; //포스팅 갯수
        let promotionApproval='N'; 
        promotionCheckValue[0].map((v,i)=>{
            postCount+=v.postCount
        }); 

        if(postCount >= promotionLevel){
            promotionApproval='Y';
        }
        
        return res.status(200).json({promotionApproval,promotionYN});  

    }catch(e){
        console.error(e); 
    }


});




module.exports  = router; 