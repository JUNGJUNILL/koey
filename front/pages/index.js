import Head from 'next/head'
import Link from 'next/link'
import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;

import axios from  'axios'; 
import {END} from 'redux-saga'; 
import 
    {LOAD_USER_REQUEST,} 
    from '../reducers/auth'; 

import wrapper from '../store/configureStore';
import MainCardImageComponenet from '../components/mainPage/MainCardImageComponenet'


const Home =()=>{

  const ht ="http://localhost:3095"; 
  const postflag = '1001'; 
  const userFlag = "nick1111";
  const fileName1 = '에이싯팔1607324381388.jpg';
  const fileName2 = '동기부여1607408839105.png'; 
  const fileName3 = '담배땡긴다 - 복사본1622693419222.jpg';  

  return (
    <div>

  <Row style={{marginTop:'3%'}}>

  <Col span={8} style={{padding:'5px'}}> 
    <Card bordered={true}

    cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} src={`http://localhost:3095/1001/nick1111/%EB%8F%99%EA%B8%B0%EB%B6%80%EC%97%AC1607408839105.png`} />}

    >
    <Meta title="와 진짜 대박이다...."/>
   
    </Card>
  </Col>
  <Col span={8} style={{padding:'5px'}}>
    <Card bordered={true}
    cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} src={`http://localhost:3095/1001/nick1111/%EC%97%90%EC%9D%B4%EC%8B%AF%ED%8C%941607324381388.jpg`} />}
    
    >
    <Meta title={<font>"와 진짜 음 말이 안되네...."</font>} />
    
    </Card>
  </Col>
  <Col span={8} style={{padding:'5px'}}>
    <Card  bordered={true}
    cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} src={`http://localhost:3095/1001/nick1111/%EB%8B%B4%EB%B0%B0%EB%95%A1%EA%B8%B4%EB%8B%A4%20-%20%EB%B3%B5%EC%82%AC%EB%B3%B81622693419222.jpg`} />}
    
    >
    <Meta title="Card content"/>
    </Card>
  </Col>
</Row>

     <Link href="/posts/first-post-Server-side"><a>go to first-page-Server-side</a></Link>
     <br/>
     <Link href="/posts/first-post-Static-Generation"><a>go to first-page-Static</a></Link>
     <br/>
     <Link href="/posts/abc?foo=bar"><a>DynamicRouter Also goes to pages/post/[pid].js</a></Link>
     <br />
     <Link href="/posts/abc/a-comment"><a>DynamicRouter Also goes to pages/post/[pid]/[comment].js</a></Link>
     <br />
     <Link href="/posts/testPage"><a>테스트 페이지Gee</a></Link>

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


  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 


});

export default Home; 
