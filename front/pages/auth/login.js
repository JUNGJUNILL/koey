
import {useCallback,useState,useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import Router from 'next/router'; 
import styled from 'styled-components';  
import 
    {LOAD_LOGIN_REQUEST,
     LOGIN_REQUEST, 
    } 
from '../../reducers/auth'; 
import { useRouter } from 'next/router';
import {Button,Input} from 'antd'
import { backUrl } from '../../config/config';

const DiveWrapper = styled.div`
margin-top : 5%; 
margin-bottom:5%
`;
const ButtonWrapper = styled(Button)`
margin-bottom:1.5%;
width:80%;
display:inline-block
`;

const Login = ()=>{

    const dispatch = useDispatch(); 
    const router   =useRouter(); 
    const {isLogining,userInfo,loginError} = useSelector(state => state.auth); 
    const hell = process.env.NAVERLOGINCLIENTCODE; 

    const [id,setId] = useState(''); 
    const [password, setPassword] = useState('');
    const naverLoginUri    =process.env.NODE_ENV==='production'?`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVERLOGINCLIENTCODE}&redirect_uri=${process.env.NAVERLOGINREDIRECT}&state=RAMDOM_STATE`
                                                               :`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVERLOGINCLIENTCODE}&redirect_uri=${process.env.NAVERLOGINREDIRECT_LOCAL}&state=RAMDOM_STATE`

    const facebookLoginUri =process.env.NODE_ENV==='production' ?`https://www.facebook.com/v10.0/dialog/oauth?client_id=${process.env.FACEBOOKLOGINCLIENTCODE}&redirect_uri=${process.env.FACEBOOKLOGINREDIRECT}&state=200`
                                                                :`https://www.facebook.com/v10.0/dialog/oauth?client_id=${process.env.FACEBOOKLOGINCLIENTCODE}&redirect_uri=${process.env.FACEBOOKLOGINREDIRECT_LOCAL}&state=200`


    //일반 로그인, 
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch({type:LOGIN_REQUEST,
                  data: {
                    userId:id,  
                    password:password, 
                    loginType:'local', 
                  }
        }); 

    },[id,password]); 

    useEffect(()=>{

        if(loginError){
            alert(loginError); 
            return; 
        }

        if(userInfo){
            router.push({pathname:'/'});
        }

    },[loginError,userInfo])



    const onChangeId = useCallback((e)=>{
        setId(e.target.value); 
    },[id])


    const onChangPassword = useCallback((e)=>{
        setPassword(e.target.value); 
    },[password])

    //시도 01
    function kakaoLoginPopup(){
        Kakao.Auth.login({
            scope:'profile, ', 
            success: function(authObj){
                    console.log('authObj==>' , authObj); 
                    Kakao.API.request({
                        url:'/v2/user/me', 
                        success: res =>{
                            const kakao_account = res.kakao_account
                            console.log('authObj=>' , kakao_account); 
                        }
                    })
                }
            })
    }

    const SNSLogin = (kind)=>{

        dispatch({type:LOGIN_REQUEST,
            data: {
              loginType:kind, 
            }
         }); 
    }


    return (
        <>
        <form onSubmit={onSubmit}>
        <div style={{textAlign:'center',marginTop:'5%',marginBottom:'3%',}}>
            <div style={{display:'inline-block',border:'1px solid',height:'10vh',width:'80%',marginBottom:'3%'}}>로고</div>
            <Input style={{width:'80%',marginBottom:'1%'}} type="text" name="userId" value={id} onChange={onChangeId} placeholder={'아이디'}/>
            <Input style={{width:'80%'}} type="password" name="password" value={password} onChange={onChangPassword} placeholder={'비밀번호'}/>
            <ButtonWrapper type="primary" onClick={onSubmit} loading={isLogining} block>로그인</ButtonWrapper>
        </div>
     
        </form>         
        <div style={{textAlign:'center',marginTop:'3%'}}>
            <Link href={`${naverLoginUri}`}>
                <a><ButtonWrapper block>네이버(NAVER) 로그인 </ButtonWrapper></a>
            </Link>
                <ButtonWrapper onClick={()=>SNSLogin('kakao')} block>카카오(KAKAO) 로그인 </ButtonWrapper>
                <ButtonWrapper block disabled>구글(GOOGLE)) 로그인(준비중) </ButtonWrapper>
            <Link href={`${facebookLoginUri}`}>
                <a><ButtonWrapper block disabled>페이스북(FACEBOOK) 로그인(준비중) </ButtonWrapper> </a>      
            </Link>
        </div>  
             {/* 
             <Link href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVERLOGINCLIENTCODE}&redirect_uri=${process.env.NAVERLOGINREDIRECT}&state=RAMDOM_STATE`}><a><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a></Link>
            <Link href={`https://www.facebook.com/v10.0/dialog/oauth?client_id=${process.env.FACEBOOKLOGINCLIENTCODE}&redirect_uri=${process.env.FACEBOOKLOGINREDIRECT}&state=200`}><a>페이스북 로그인</a></Link>

            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <ButtonWrapper onClick={kakaoLoginPopup} block>카카오 로그인 팝업</ButtonWrapper>
          
            <ButtonWrapper type="link" block><Link href={{path:`${backUrl}/auth/kakao`}}><a>카카오 로그인</a></Link></ButtonWrapper>
            */}
        </>
    )

}

export default Login; 