
import {useCallback,useState, useRef} from 'react'
import {Row,Col,Avatar,Badge} from  'antd'; 
import {UserOutlined } from '@ant-design/icons'


import Router from 'next/router'; 
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';


//import wrapper from '../store/configureStore';
import { backImageUrl } from '../config/config';
import 
    {LOGOUT_REQUEST,} 
from '../reducers/auth'

import GooleAds_header from './Ads/GooleAds_header'; 
import GooleAds_footer from './Ads/GooleAds_footer';


const AppLayOut = ({children}) =>{
    const categoryList = [{ categoryName:'좋좋소!',posf:'1001'},
                          { categoryName:'좋소!',posf:'1002'},      
                          { categoryName:'유머',posf:'1003'},     
                          { categoryName:'연애/결혼',posf:'1004'},     
                          { categoryName:'좋소!탈출',posf:'1005'},     
                          { categoryName:'좋소!희망편',posf:'1006'},     
                          { categoryName:'경제적 자유',posf:'1007'},     
                          { categoryName:'자기계발',posf:'1008'}, 
                              
                          { categoryName:'상식/정보',posf:'1009'},     
                          { categoryName:'핫딜/광고',posf:'1010'},     
                          { categoryName:'운영진 요청사항',posf:'1011'},     
                        ]; 

    const dispatch = useDispatch(); 
    const {userInfo,representativeAlarm} = useSelector((state)=>state.auth); 
    const {posf,mainPosts_1001} = useSelector((state)=>state.mainPosts_1001); 
    const [badgeValue,setBadge] = useState('Y');

    //로그아웃 버튼
    const logOut = useCallback(()=>{
        setBadge('Y'); 
        dispatch({
            type:LOGOUT_REQUEST, 
        });

        Router.push('/auth/login'); 

    },[userInfo,badgeValue]); 
 

    //index 페이지 이동
    const gotoHome = () =>{
        Router.push('/'); 
    }

    //프로필 화면으로 이동 
    const goProfile = useCallback(() =>{
        if(representativeAlarm==='Y'){
            setBadge('N'); 
        }
        Router.push('/posts/profile'); 
        return; 
    },[badgeValue,representativeAlarm])
    
    //스크롤 위치 초기화
    const initScrollRestoration = () =>{

        window.localStorage.setItem('scrollY',0); 

    }


    const alarm01control = useCallback(()=>{

        //승진 조건이 충족되었을 경우 뜨는 알람
        if(badgeValue==='Y' && representativeAlarm==='Y'){
            return true;
        }

    },[badgeValue,representativeAlarm])
 
    
    return(

        <Row>
        <Col xs={24} md={6}>
        </Col>
    

        <Col  xs={24} md={12}>
 
    
        <header className="hd">
        <h1 className="h1">
               
        {/* <AlignLeftOutlined onClick={showDrawer}/>*/}&nbsp;<img src={`${backImageUrl}/sitelogo.png`} style={{width:"111",height:"28",justifyContent:"left"}} onClick={gotoHome}></img>
	    </h1>

        <div className="fr" style={{marginRight:"-5px"}}>
        {!userInfo ?    <Link href={'/auth/login'} ><a className="mu">로그인</a></Link>:'' }
        {!userInfo ?    <Link href={'/auth/authentication'} ><a className="mu">회원가입</a></Link>:<Link  href={'/posts/profile'} ><a className="mu"><Badge count={alarm01control() ?'N':''}  size='small'><Avatar size="small" icon={<UserOutlined />} onClick={goProfile}/></Badge>&nbsp;<label onClick={goProfile}>내 정보</label></a></Link> } 
        {userInfo &&    <a className="mu" onClick={logOut}>로그아웃</a>} 

        </div>
  
        </header>

        <nav className='navInfo'>
            {categoryList.map((v)=>(
                <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:v.posf}} }><a style={{backgroundColor:posf===v.posf?'#4CAF50':''}} onClick={initScrollRestoration}>{v.categoryName}</a></Link>
            ))} 
           {/*  <Link href={{pathname:'/tools/arrearsofwages'}}><a>임금채불 사업장</a></Link> */}
        </nav>
        {/*구글광고*/}
        <GooleAds_header />        
        
      
                

    {children}

    
    <footer>
        {/*구글광고* 잘 되면 넣자./}
        {/*<GooleAds_footer />*/}
        <div className="footerSub" />
        <div className="footer">
            <b>좋소? 좋좋소!</b>
            <br/>
            <Link href={{pathname:'/posts/[detailPage]',
                            query:{detailPage:'detailPage',
                            postId:'10000002',
                            postFlag:'1011',
                            submitDay:'99999999',
                            pid:'ZGV2amppMTIwN0BnbWFpbC5jb20=',  
                  },}}><a>운영목적 | </a></Link>
            <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1011'}}}><a>운영진 요청사항 | </a></Link>
            <Link href={{pathname:'/posts/[detailPage]',
                            query:{detailPage:'detailPage',
                            postId:'10000003',
                            postFlag:'1011',
                            submitDay:'99999999',
                            pid:'ZGV2amppMTIwN0BnbWFpbC5jb20=',  
                  },}}><a>후원하기</a></Link>
            <br/>
            좋소(jscompany)2021 ~ © All Rights Reserved.
        </div>
    </footer>
    </Col>

    
    {/*
   
    */}

    <Col xs={24} md={6}>
    </Col>

  
    </Row> 
     
        ); 

}

export default AppLayOut; 