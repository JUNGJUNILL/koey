import immerProduce from '../util/produce';

export const  initialState = {

    isJoinng : false,           //회원가입 시도중 
    joined   : ''   ,           //회원가입 성공 

    checkingNickName : false,   //중복 확인 버튼 클릭 
    nickNameExistence : '',     //닉네임 중복 여부

    isLogining : false,         //로그인 시도 중
    userInfo : null,            //사용자 정보
    userid   : null,            //사용자 아이디
    userLevel: '',              //유저 레벨
    userlevelName:'',           //유저 레벨 이름
    loginError:null,            //로그인 에러 메시지

    emailSending:false,         //이메일 보내기 버튼 클릭 
    emailSendingResponse:'',    //메일 응답 
    userEmailadress:'',         //사용자 메일
    mailExistence:'',           //가입여부

    promotionCheckValue:null,   //승진 가능 여부 
    promotionReviewValue:null,  //승진 심사중 

}


export const JOIN_REQUEST = 'JOIN_REQUEST'; 
export const JOIN_SUCCESS = 'JOIN_SUCCESS'; 
export const JOIN_FAILURE = 'JOIN_FAILURE'; 

export const LOGIN_REQUEST = 'LOGIN_REQUEST'; 
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; 
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; 

export const LOAD_LOGIN_REQUEST = 'LOAD_LOGIN_REQUEST'; 

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'; 
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'; 
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'; 

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'; 
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'; 
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'; 

//인증 이메일 보내기 
export const SEND_EMAIL_REQUEST='SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS='SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE='SEND_EMAIL_FAILURE';

//닉네임 중복 확인 
export const CHECK_NICKNAME_REQUEST='CHECK_NICKNAME_REQUEST';
export const CHECK_NICKNAME_SUCCESS='CHECK_NICKNAME_SUCCESS';
export const CHECK_NICKNAME_FAILURE='CHECK_NICKNAME_FAILURE';

//닉네임 새로 입력 
export const LOAD_CHECK_NICKNAME='LOAD_CHECK_NICKNAME';

//승진 심사 버튼 눌렀을 경우
export const PROMOTION_REVIEW_REQUEST='PROMOTION_REVIEW_REQUEST';
export const PROMOTION_REVIEW_SUCCESS='PROMOTION_REVIEW_SUCCESS';
export const PROMOTION_REVIEW_FAILURE='PROMOTION_REVIEW_FAILURE';

//승진 가능 여부 데이터 가져오기 
export const PROMOTION_CHECK_VALUE_REQUEST='PROMOTION_CHECK_VALUE_REQUEST';
export const PROMOTION_CHECK_VALUE_SUCCESS='PROMOTION_CHECK_VALUE_SUCCESS';
export const PROMOTION_CHECK_VALUE_FAILURE='PROMOTION_CHECK_VALUE_FAILURE'; 

const reducer = (state = initialState, action) => immerProduce(state, (draft) => {


        switch(action.type){

//회원가입
//------------------------------------------------
            case JOIN_REQUEST: {
                draft.isJoinng = true;
                break; 
            }

            case JOIN_SUCCESS: {
                draft.isJoinng = false; 
                draft.joined   = '회원가입 성공!'; 
                break; 
            }

            case JOIN_FAILURE: {
                break; 
            }
//------------------------------------------------

//로그인 창 화면전환
//------------------------------------------------
            case LOAD_LOGIN_REQUEST : {
                draft.joined ='';     
                break;
            }
//------------------------------------------------



//로그인
//------------------------------------------------
            case LOGIN_REQUEST :{
                draft.loginError=null;
                draft.isLogining = true; 
                break; 
            }

            case LOGIN_SUCCESS :{
                draft.loginError = null;
                draft.isLogining = false;               
                draft.userInfo = action.data.nickName; 
                draft.userid    = action.data.userid; 
                draft.userLevel = action.data.userLevel;
                draft.userlevelName = action.data.userlevelName;
                break; 
            }
        
            case LOGIN_FAILURE :{
                draft.loginError = action.error; 
                draft.isLogining = false; 
                break; 
            }
//------------------------------------------------


//로그인 정보 유지 
//------------------------------------------------
            case LOAD_USER_REQUEST :{
                break; 
            }

            case LOAD_USER_SUCCESS :{
                draft.userInfo = action.data.nickName; 
                draft.userid    = action.data.userid; 
                draft.userLevel = action.data.userLevel; 
                draft.userlevelName = action.data.userlevelName;            
                break; 
            }

            case LOAD_USER_FAILURE :{

                break; 
            }
//------------------------------------------------

//로그아웃 
//------------------------------------------------
            case LOGOUT_REQUEST :{
                break; 
            }

            case LOGOUT_SUCCESS :{
                draft.userInfo =null; 
                break; 
            }

            case LOGOUT_FAILURE :{
                break; 
            }
//------------------------------------------------

//인증 이메일 보내기 
//------------------------------------------------
            case SEND_EMAIL_REQUEST :{
                draft.emailSending = true; 
                break; 
            }

            case SEND_EMAIL_SUCCESS :{
                draft.emailSending = false; 
                draft.emailSendingResponse = action.data.emailSendingResponse;
                draft.userEmailadress = action.data.userEmailAdress;
                draft.mailExistence = action.data.mailExistence; 
                break; 
            }

            case SEND_EMAIL_FAILURE :{
                draft.emailSending = false; 
                break; 
            }
//------------------------------------------------

//닉네임 중복 확인 
//------------------------------------------------
            case CHECK_NICKNAME_REQUEST :{
                draft.checkingNickName=true; 
                break; 
            }

            case CHECK_NICKNAME_SUCCESS :{
                draft.checkingNickName=false; 
                draft.nickNameExistence=action.data.nickNameExistence;
                break; 
            }

            case CHECK_NICKNAME_FAILURE :{
                draft.checkingNickName=false; 
                break; 
            }
//------------------------------------------------

//닉네임 새로 입력 
//------------------------------------------------
            case LOAD_CHECK_NICKNAME :{ 
                draft.nickNameExistence=''; 
                break; 
            }
//------------------------------------------------

//승진 심사 버튼 눌렀을 경우
//------------------------------------------------
            case PROMOTION_REVIEW_REQUEST :{
                break; 
            }

            case PROMOTION_REVIEW_SUCCESS :{
                break; 
            }

            case PROMOTION_REVIEW_FAILURE :{
                break; 
            }
//------------------------------------------------

//승진 가능 여부 데이터 가져오기 
//------------------------------------------------
            case PROMOTION_CHECK_VALUE_REQUEST :{
                break; 
            }

            case PROMOTION_CHECK_VALUE_SUCCESS :{
                draft.promotionCheckValue= action.data.promotionCheckValue; 
                draft.promotionReviewValue = action.data.promotionReviewValue;
                break; 
            }

            case PROMOTION_CHECK_VALUE_FAILURE :{
                break; 
            }
//------------------------------------------------
            default :  break;
    
             
        }

    }); 


export default reducer;