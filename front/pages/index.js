import Link from 'next/link'
import React,{useEffect}from 'react'
import { useSelector } from 'react-redux';
import axios from  'axios'; 
import {END} from 'redux-saga'; 
import wrapper from '../store/configureStore';

import { Card, Col, Row, List,  Button, Divider  } from 'antd';
const { Meta } = Card;

import { backImageUrl,AWSImageUrl,Url } from '../config/config';

import 
    {LOAD_USER_REQUEST,} 
from '../reducers/auth'; 

import 
    {INDEX_PAGE_DATA_1001_REQUEST,
     INDEX_PAGE_DATA_1002_REQUEST,
     INDEX_PAGE_DATA_1003_REQUEST,
     INDEX_PAGE_DATA_1004_REQUEST,
     INDEX_PAGE_DATA_1005_REQUEST,
     INDEX_PAGE_DATA_1006_REQUEST,
    } 
from '../reducers/indexPage'; 

import GoogleAds_MainPage01 from '../components/Ads/GoogleAds_MainPage01'
import GoogleAds_MainPage02 from '../components/Ads/GoogleAds_MainPage02'


const Home =()=>{

  const {data01,data02,data03,data04,data05,data06} = useSelector((state)=>state.indexPage); 
  const {userInfo,userid}       = useSelector((state)=>state.auth);



  const scrollRestoration = () =>{

    window.localStorage.setItem('scrollY',window.scrollY); 
    
  }


  useEffect(()=>{
    window.scrollTo(0,window.localStorage.getItem('scrollY')); 

  },[])

  return (
    <div>

  <Divider orientation="center">좋좋소! 베스트</Divider>
  <Row style={{marginTop:'3%'}}>
  
  {data01.map((v,i)=>(
    <Link 
        href={{
          pathname:'/posts/[detailPage]',
          query:{detailPage:'detailPage',
                  postId:v.postId,
                  postFlag:'1001',
                  submitDay:v.submitDay,
                  pid:v.userid,  
                  userNickName:userInfo,                          
                  who:userid,},

        }}>
    <Col span={8} style={{padding:'5px'}}> 
    <div style={{textAlign:'center'}}>
      <div>
          <img style={{width:'100%',height:'130px',objectFit:'cover'}}  
               src={v.firstImageName.length > 0 ? 
                    process.env.NODE_ENV==='production' 
                    ? 
                    `${AWSImageUrl}/images/1001/${v.firstImageName}`
                    : 
                    `${backImageUrl}/1001/${v.firstImageName}`   
                    :`${Url}/noimages.gif`               
          } />    
          <br />
          <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
          {v.title}
          </div>
      </div>
    </div>
  </Col>
  </Link>
  ))}

</Row>


    {/*좋소!*/}
    <List
    style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
    itemLayout="horizontal"
    header={<div><b>좋소!</b></div>}
    footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1002'}}} scroll={false}><a><Button onClick={scrollRestoration} block>더 보기</Button></a></Link></div>}

    dataSource={data02}
    renderItem={item => (
      <List.Item onClick={scrollRestoration}>
      <Link 
          href={{
            pathname:'/posts/[detailPage]',
            query:{detailPage:'detailPage',
                    postId:item.postId,
                    postFlag:'1002',
                    submitDay:item.submitDay,
                    pid:item.userid,  
                    userNickName:userInfo,                          
                    who:userid,},
      
          }}>
      <a className="abbreviation">
      <span className="bestSpan">BEST</span> 
        {item.title}
        <span className="countFontColor">[{item.commentCount}] </span>
      </a>
      </Link>
      </List.Item>
    )}
    />

  {/*구글 광고*/}
  <GoogleAds_MainPage01 />

    {/*유머*/}
    <List
    style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
    itemLayout="horizontal"
    header={<div><b>유머</b></div>}
    footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1003'}}} scroll={false}><a><Button onClick={scrollRestoration} block>더 보기</Button></a></Link></div>}

    dataSource={data03}
    renderItem={item => (
      <List.Item onClick={scrollRestoration}>
      <Link href={{
            pathname:'/posts/[detailPage]',
            query:{detailPage:'detailPage',
                    postId:item.postId,
                    postFlag:'1003',
                    submitDay:item.submitDay,
                    pid:item.userid,  
                    userNickName:userInfo,                          
                    who:userid,},
      
          }}>
      <a className="abbreviation">
      <span className="bestSpan">BEST</span> 
        {item.title}
        <span className="countFontColor">[{item.commentCount}] </span>
      </a>
      </Link>
      </List.Item>
    )}
    />

    {/*연애/결혼*/}
    <List
    style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
    itemLayout="horizontal"
    header={<div><b>연애/결혼</b></div>}
    footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1004'}}} scroll={false}><a><Button onClick={scrollRestoration} block>더 보기</Button></a></Link></div>}

    dataSource={data04}
    renderItem={item => (
      <List.Item onClick={scrollRestoration}>
      <Link href={{
            pathname:'/posts/[detailPage]',
            query:{detailPage:'detailPage',
                    postId:item.postId,
                    postFlag:'1004',
                    submitDay:item.submitDay,
                    pid:item.userid,  
                    userNickName:userInfo,                          
                    who:userid,},
      
          }}>
      <a className="abbreviation">
      <span className="bestSpan">BEST</span> 
        {item.title}
        <span className="countFontColor">[{item.commentCount}] </span>
      </a>
      </Link>
      </List.Item>
    )}
    />


     {/*좋소!탈출*/}
     <List
     style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
     itemLayout="horizontal"
     header={<div><b>좋소!탈출</b></div>}
     footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1005'}}} scroll={false}><a><Button onClick={scrollRestoration} block>더 보기</Button></a></Link></div>}
 
     dataSource={data05}
     renderItem={item => (
       <List.Item onClick={scrollRestoration} >
       <Link href={{
            pathname:'/posts/[detailPage]',
            query:{detailPage:'detailPage',
                    postId:item.postId,
                    postFlag:'1005',
                    submitDay:item.submitDay,
                    pid:item.userid,  
                    userNickName:userInfo,                          
                    who:userid,},
      
          }}>
       <a className="abbreviation">
       <span className="bestSpan">BEST</span> 
         {item.title}
         <span className="countFontColor">[{item.commentCount}] </span>
       </a>
       </Link>
       </List.Item>
     )}
     />

      {/*좋소!희망편*/}
      <List
      style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
      itemLayout="horizontal"
      header={<div><b>좋소!희망편</b></div>}
      footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1006'}}} scroll={false}><a><Button onClick={scrollRestoration} block>더 보기</Button></a></Link></div>}
  
      dataSource={data06}
      renderItem={item => (
        <List.Item onClick={scrollRestoration} >
        <Link href={{
            pathname:'/posts/[detailPage]',
            query:{detailPage:'detailPage',
                    postId:item.postId,
                    postFlag:'1006',
                    submitDay:item.submitDay,
                    pid:item.userid,  
                    userNickName:userInfo,                          
                    who:userid,},
      
          }}>
        <a className="abbreviation">
        <span className="bestSpan">BEST</span> 
          {item.title}
          <span className="countFontColor">[{item.commentCount}] </span>
        </a>
        </Link>
        </List.Item>
      )}
      />

    {/*구글 광고*/}
    <GoogleAds_MainPage02 />

   </div>

  )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
   const cookie = context.req ? context.req.headers.cookie : '';
   axios.defaults.headers.Cookie = '';
   if (context.req && cookie) { //쿠키 공유 방지 
     axios.defaults.headers.Cookie = cookie;
   }
 
  context.store.dispatch({
    type:LOAD_USER_REQUEST
  });

  
  context.store.dispatch({
    type:INDEX_PAGE_DATA_1001_REQUEST, 
    data:{postFlag:'1001',}, 
  });

  context.store.dispatch({
    type:INDEX_PAGE_DATA_1002_REQUEST, 
    data:{postFlag:'1002',}, 
  });

  context.store.dispatch({
    type:INDEX_PAGE_DATA_1003_REQUEST, 
    data:{postFlag:'1003',}, 
  });

  context.store.dispatch({
    type:INDEX_PAGE_DATA_1004_REQUEST, 
    data:{postFlag:'1004',}, 
  });

  context.store.dispatch({
    type:INDEX_PAGE_DATA_1005_REQUEST, 
    data:{postFlag:'1005',}, 
  });

  context.store.dispatch({
    type:INDEX_PAGE_DATA_1006_REQUEST, 
    data:{postFlag:'1006',}, 
  });






  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 


});

export default Home; 
