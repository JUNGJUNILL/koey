import React, { useCallback,useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Button,Input} from 'antd'

import Router from 'next/router'; 

import 
    {JOIN_REQUEST,
     CHECK_NICKNAME_REQUEST,
     LOAD_CHECK_NICKNAME
    } 
from '../../reducers/auth'; 

import secureFilter  from  '../../util/secureFilter';
import base64Decoder from  '../../util/base64Decoder';
import { useRouter } from 'next/router';


const Join = ()=>{

    const dispatch = useDispatch(); 
    const router   =useRouter(); 

    const {isJoinng, joined, nickNameExistence, checkingNickName} = useSelector(state => state.auth); 

    const [nickName, setNickName] = useState('');
    const [checkNickName,setCheckNickname] =useState(false); 
    const [nickNameCount,setNickNameCount] = useState(0); 
    const refNickName = useRef(); 

    const [password, setPassword] = useState('');
    const refPassword = useRef(); 
    const [passwordCheck, setPasswordCheck] = useState(''); 
    const refPasswordCheck = useRef(); 
    const [passwordErr,setPasswordErr] = useState(false); 

    const pid  = router.query.pid ? router.query.pid : ''; 
    const refPid = useRef(); 

    
    const blank_pattern = /^\s+|\s+&/g; 
    const spc_pattern = /[~!@#$%^&*()_+|<>?:{}]/; 

    useEffect(()=>{

        setCheckNickname(nickNameExistence); 
        if(nickName.length===0 || nickNameCount!==nickName.length){
            
        dispatch({
            type:LOAD_CHECK_NICKNAME, 
            })
        }

    },[nickNameExistence,nickName,nickNameCount]); 



    if(joined){
        alert(joined);  
        Router.push('/auth/login'); 
    }


    //회원가입 서밋 
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        if(password !== passwordCheck){

            return setPasswordErr(true); 
        }

        const checkMail = base64Decoder(pid).split('@'); 

        if(checkMail[0].length===0 || 
                                   !(checkMail[1]==='naver.com'
                                   || checkMail[1]==='nate.com'
                                   || checkMail[1]==='gmail.com'
                                   || checkMail[1]==='daum.net')
        ){
                return alert('잘못된 접근입니다.'); 
            }


        if(nickName.length===0){
            refNickName.current.focus();  
            return alert('닉네임을 입력 해 주시기 바랍니다.'); 
        }

        if(!checkNickName){
            refNickName.current.focus();  
            return alert(`닉네임 중복검사를 해 주시기 바랍니다.`); 
        }

        if(password.length===0){
            refPassword.current.focus();  
            return alert('비밀번호를 입력 해 주시기 바랍니다.'); 
        }

        if(passwordCheck.length===0){
            refPasswordCheck.current.focus();  
            return alert('비밀번호를 확인 해 주시기 바랍니다.'); 
        }

   

        dispatch({
                    type:JOIN_REQUEST, 
                    data:{
                        id:pid, 
                        nickname:secureFilter(nickName), 
                        password:password,
                        email:base64Decoder(pid), 
                    }
        })

    },[pid,nickName,password,passwordCheck,checkNickName]); 

    //중복 체크
    const onCheckNickName = useCallback(()=>{

        if(nickName.length === 0 || nickName.replace(blank_pattern,'')===""){
            refNickName.current.focus();  
            return alert('닉네임을 입력 해 주세요'); 
            
        }

        if(spc_pattern.test(nickName)){
            refNickName.current.focus();  
            return alert('특수문자는 입력 할 수 없습니다.'); 
        }

        setNickNameCount(nickName.length); 
                
        dispatch({
            type:CHECK_NICKNAME_REQUEST, 
            data:{
                chckNickName:encodeURIComponent(nickName), 
            }
    });

    },[nickName])


    const onChangeNickName = useCallback((e)=>{
        setNickName(e.target.value);         
    },[nickName])

    const onChangPassword = useCallback((e)=>{
        setPasswordErr(e.target.value !== passwordCheck); 
        setPassword(e.target.value); 
    },[password])

    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordErr(e.target.value !== password); 
        setPasswordCheck(e.target.value); 
    },[passwordCheck])



    return (
            <>           
            <form onSubmit={onSubmit}>
            <input type="hidden" name="id" value={'조이 존나 쪼일듯'} />
            <input type="text" value={base64Decoder(pid)} />
            

            <div style={{textAlign:'center',marginTop:'5%',marginBottom:'3%',}}>
                <div style={{display:'inline-block',border:'1px solid',height:'10vh',width:'80%',marginBottom:'3%'}}>
                    회원가입
                </div>
    
                <Input addonBefore={<div style={{width:'50px'}} type="text" >이메일</div>} 
                       ref={refPid}
                       name="email" 
                       value={base64Decoder(pid)}
                       readOnly={true}
                       style={{width:'80%',marginBottom:'1%'}}  
                       placeholder={"이메일"} 
                       type="text" />
                <div>
                    {checkNickName      ? <div style={{color:'green'}}>사용 가능한 닉네임 입니다.</div>
                                        :  
                                        checkNickName.length ===0 || nickName.length===0 ? "":<div style={{color:'red'}}>이미 사용중인 닉네임 입니다.</div>
                }
                </div>
                <Input addonBefore={<div style={{width:'50px'}}>닉네임</div>} 
                       ref={refNickName}
                       name="nickname" 
                       value={nickName}
                       onChange={onChangeNickName}
                       style={{width:'80%',marginBottom:'1%'}}  
                       placeholder={"닉네임"} 
                       addonAfter={<Button size="small" onClick={onCheckNickName} loading={checkingNickName} >중복 확인</Button>} 
                       type="text" 
                       maxLength={10}
                       />

                <div>
                    {passwordErr && <div style={{color:'red'}}>비밀번호가 다릅니다.</div>}
                </div>

                <Input addonBefore={<div style={{width:'50px'}}>비번</div>} 
                       ref={refPassword}
                       name="nickname" 
                       value={password}
                       onChange={onChangPassword}
                       style={{width:'80%',marginBottom:'1%'}}  
                       placeholder={"비밀번호"} 
                       type="password" 
                       maxLength={20}
                       />

                <Input addonBefore={<div style={{width:'50px'}}>비번확인</div>} 
                       ref={refPasswordCheck}
                       name="nickname" 
                       value={passwordCheck}
                       onChange={onChangePasswordCheck}
                       style={{width:'80%',marginBottom:'1%'}}  
                       placeholder={"비밀번호확인"}  
                       type="password" 
                       maxLength={20}
                       />

                <Button style={{width:'80%'}} 
                        onClick={onSubmit} 
                        loading={isJoinng} 
                        type="primary"  
                        block >가입하기 
                </Button> 
            
                
            </div>
            </form>
            </>
    )


}

export default Join; 