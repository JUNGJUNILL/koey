import axios from 'axios'
import jwtDeCoder from 'jwt-decode'
import { backUrl } from '../config/config';
//import Kakao from 'kakaojs'; 
import {all,fork,takeLatest,takeEvery ,put, delay,call} from 'redux-saga/effects'; 
import 
    {JOIN_REQUEST,
     JOIN_SUCCESS,
     JOIN_FAILURE,

     LOGIN_REQUEST,
     LOGIN_SUCCESS,
     LOGIN_FAILURE, 

     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAILURE,

     LOGOUT_REQUEST,
     LOGOUT_SUCCESS,
     LOGOUT_FAILURE,

     SEND_EMAIL_REQUEST,
     SEND_EMAIL_SUCCESS,
     SEND_EMAIL_FAILURE,

    CHECK_NICKNAME_REQUEST,
    CHECK_NICKNAME_SUCCESS,
    CHECK_NICKNAME_FAILURE, 

    PROMOTION_REVIEW_REQUEST,
    PROMOTION_REVIEW_SUCCESS,
    PROMOTION_REVIEW_FAILURE,

    PROMOTION_CHECK_VALUE_REQUEST,
    PROMOTION_CHECK_VALUE_SUCCESS,
    PROMOTION_CHECK_VALUE_FAILURE,


    } 
from '../reducers/auth'; 


//유저정보 유지 사이클 
//------------------------------------------------------------------------
function APILoadUser(data){

    return axios.get('/auth/' ,{data}, {withCredentials:true}); 
}

function* sagaLoadUser(action){

    try{

        const result = yield call(APILoadUser,action.data);    
        const nick = result.data.nick;
        const userid    = result.data.userid; 
        const userlevel = result.data.levelId?result.data.levelId:'';
        const userlevelName = result.data.levelName?result.data.levelName:'';
        
        yield put({
                type:LOAD_USER_SUCCESS, 
                data: {nickName: nick,
                       userid:userid,
                       userLevel:userlevel,
                       userlevelName:userlevelName
                    },           
        }); 

    }catch(e){
        console.error(e); 
        yield put({
            type:LOAD_USER_FAILURE,
            error:e, 
        });
    }

}


function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,sagaLoadUser);
}
//------------------------------------------------------------------------




//회원가입 사이클 
//------------------------------------------------------------------------
function APIJoin(data){
    return axios.post('/auth/join',{data},{withCredentials:true}); 

}




function* sagaJoin(action){
    
    try{
        const result = yield call(APIJoin,action.data); 
        yield put({
            type:JOIN_SUCCESS,
            data: result,
        }); 

    }catch(e){

      console.error(e); 

        yield put({
            type:JOIN_FAILURE,
            error:e, 
        })
    }

}



function* watchJoin(){
    yield takeLatest(JOIN_REQUEST,sagaJoin)
}
//------------------------------------------------------------------------




//로그아웃 사이클
//------------------------------------------------------------------------
function APILogOut(){

    return axios.get('/auth/logOut',{withCredentials:true});


}

function* sagaLogOut(){


    try{
      const result =   yield call(APILogOut); 
    

        yield put({
            type:LOGOUT_SUCCESS,
        }); 


    }catch(e){
        alert('로그아웃 에러'); 
        yield put({
            type:LOGOUT_FAILURE, 
            error:e,
        })
    }
}

function* watchLogOut(){
    yield takeLatest(LOGOUT_REQUEST,sagaLogOut); 
}
//------------------------------------------------------------------------


//로그인 사이클
//------------------------------------------------------------------------
function APILogin(data){

    //jwt 로그인
    return axios.post('/auth/login',{data},{withCredentials:true}).catch((error)=>{
        if(error.response){
            console.log(error.response);
            return error.response; 
        }
    });

    //passport local 로그인
    //return axios.post('/auth/login',data,{withCredentials:true});
}
//카카오 로그인 
function APILoginKakao(){

    return axios.get('/auth/kakao/',{withCredentials:true});
}

function APILoginKakaoSDK(){
    return axios.get('/auth/kakaoTest/',{withCredentials:true});
}

function* sagaLogin(action){


    try{
        let result; 
        let decoded;
        
        //jwt 로그인
        if(action.data.loginType==='local'){
            result = yield call(APILogin,action.data); 
            if(result.status > 400){
                throw Error(result.data.message);
            }
            decoded =jwtDeCoder(result.data.token); 
            
            yield put({
                type:LOGIN_SUCCESS,
                data:{nickName: decoded.nick,
                      userid:decoded.userId,
                      userLevel:decoded.userLevel,
                      userlevelName : decoded.userlevelName
                    },   
            }); 

        //카카오 로그인
        }else if(action.data.loginType==='kakao'){
            
            Kakao.init('71a70e1c6ee55af30c3f9ec51fd7dcb7'); 
            if(Kakao.isInitialized()){
                    Kakao.Auth.authorize({               
                        //redirectUri:'http://localhost:3095/api/auth/kakaoTest',
                        redirectUri:`${backUrl}/auth/kakaoTest`,
                    });
                }

        //네이버 로그인
        }else{

            return axios.get('/auth/naverLogin/',{withCredentials:true});
        }
        
        
                               



    }catch(e){
  
        yield put({
            type:LOGIN_FAILURE, 
            error:e.message,
        })
    }
}

function* watchLogin(){
    yield takeEvery(LOGIN_REQUEST,sagaLogin); 
}
//------------------------------------------------------------------------



//이메일 인증 사이클
//------------------------------------------------------------------------
function APISendEmail(data){

    return axios.post('/auth/sendemail',{data},{withCredentials:true});


}

function* sagaSendEmail(action){


    try{
      const result =   yield call(APISendEmail,action.data); 
        
        yield put({
            type:SEND_EMAIL_SUCCESS,
            data:{emailSendingResponse:result.data.response,
                  userEmailAdress     :result.data.userEmailAdress,
                  mailExistence       :result.data.mailExistence,
                 }
        }); 


    }catch(e){
        alert('이메일 보내기 에러'); 
        yield put({
            type:SEND_EMAIL_FAILURE, 
            error:e,
        })
    }
}

function* watchSendEmail(){
    yield takeLatest(SEND_EMAIL_REQUEST,sagaSendEmail); 
}
//------------------------------------------------------------------------



//닉네임 중복 확인 
//------------------------------------------------------------------------
function APICheckNickName(data){

    return axios.post('/auth/checkNickName',{data},{withCredentials:true});


}

function* sagaCheckNickName(action){


    try{
      const result =   yield call(APICheckNickName,action.data); 
        
        yield put({
            type:CHECK_NICKNAME_SUCCESS,
            data:{nickNameExistence : result.data.nickNameExistence,}
        }); 


    }catch(e){
        alert('닉네임 중복 체크 에러'); 
        yield put({
            type:CHECK_NICKNAME_FAILURE, 
            error:e,
        })
    }
}

function* watchCheckNickName(){
    yield takeLatest(CHECK_NICKNAME_REQUEST,sagaCheckNickName); 
}
//------------------------------------------------------------------------

//승진 심사
//------------------------------------------------------------------------
function APIPromotionReview(data){

    return axios.post('/auth/promotioncheck',{data},{withCredentials:true});

}

function* sagaPromotionReview(action){


    try{
        const result =   yield call(APIPromotionReview,action.data);        
        
        yield put({
            type:PROMOTION_REVIEW_SUCCESS,
            data:{ promotionCondition:result.data.promotionApproval,}
        }); 


    }catch(e){
        alert('승진 심사 체크 에러'); 
        yield put({
            type:PROMOTION_REVIEW_FAILURE, 
            error:e,
        })
    }
}

function* watchCheckPromotionReview(){
    yield takeLatest(PROMOTION_REVIEW_REQUEST,sagaPromotionReview); 
}
//------------------------------------------------------------------------



//승진 가능 여부 데이터 가져오기 
//------------------------------------------------------------------------
function APIPromotionCheckValue(data){

    return axios.post('/auth/promotioncheckvalue',{data},{withCredentials:true});


}

function* sagaPromotionCheckValue(action){


    try{
        const result =   yield call(APIPromotionCheckValue,action.data);   
        console.log(result.data);    
        console.log(result.data.promotionApproval);    

        console.log(result.data.promotionYN);    

        yield put({
            type:PROMOTION_CHECK_VALUE_SUCCESS,
            data:{ promotionCheckValue:result.data.promotionApproval}
        }); 


    }catch(e){
        alert('/승진 가능 여부 데이터 가져오기 에러'); 
        yield put({
            type:PROMOTION_CHECK_VALUE_FAILURE, 
            error:e,
        })
    }
}

function* watchPromotionCheckValue(){
    yield takeLatest(PROMOTION_CHECK_VALUE_REQUEST,sagaPromotionCheckValue); 
}
//------------------------------------------------------------------------

export default function* authSaga(){


    yield all([
        fork(watchJoin), 
        fork(watchLogin), 
        fork(watchLoadUser), 
        fork(watchLogOut), 
        fork(watchSendEmail), 
        fork(watchCheckNickName), 
        fork(watchCheckPromotionReview),
        fork(watchPromotionCheckValue), 
        
    ])
}