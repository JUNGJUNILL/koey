import Link from 'next/link'
import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from  'axios'; 
import {END} from 'redux-saga'; 
import wrapper from '../store/configureStore';

import { Card, Col, Row, List, Typography, Button, Divider  } from 'antd';
const { Meta } = Card;

import 
    {LOAD_USER_REQUEST,} 
from '../reducers/auth'; 

import 
    {INDEX_PAGE_DATA01_REQUEST, } 
from '../reducers/indexPage'; 



const Home =()=>{

  const {data01} = useSelector((state)=>state.indexPage); 


  const ht ="http://localhost:3095"; 
  const postflag = '1001'; 
  const userFlag = "nick1111";
  const fileName1 = '에이싯팔1607324381388.jpg';
  const fileName2 = '동기부여1607408839105.png'; 
  const fileName3 = '담배땡긴다 - 복사본1622693419222.jpg';  


  return (
    <div>

  <Divider orientation="center">명예의 전당</Divider>
  <Row style={{marginTop:'3%'}}>

  <Col span={8} style={{padding:'5px'}}> 
    <Card bordered={true}
          cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} 
          src={`http://localhost:3095/1001/nick1111/%EB%8F%99%EA%B8%B0%EB%B6%80%EC%97%AC1607408839105.png`} />}
    >
    <Meta title={<font style={{fontSize:'0.5vh'}}>와 진짜 대박이다 새우깡 호박깡</font>}
          style={{height:'15px'}}
    />
    </Card>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <Card bordered={true}
          cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} 
          src={`http://localhost:3095/1001/nick1111/%EC%97%90%EC%9D%B4%EC%8B%AF%ED%8C%941607324381388.jpg`} />}
    >
    <Meta title={<font style={{fontSize:'0.5vh'}}>와 진짜 음 말이 안되네 감자깡</font>} 
          style={{height:'15px'}}
    />
    </Card>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <Card  bordered={true}
           cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} 
           src={`http://localhost:3095/1001/nick1111/%EB%8B%B4%EB%B0%B0%EB%95%A1%EA%B8%B4%EB%8B%A4%20-%20%EB%B3%B5%EC%82%AC%EB%B3%B81622693419222.jpg`} />}
    >
    <Meta title={<font style={{fontSize:'0.5vh'}}>와 진짜 음 말이 안되네 감자깡</font>}
          style={{height:'15px'}}
    />
    </Card>
  </Col>
</Row>


<Row style={{marginTop:'3%'}}>

  <Col span={8} style={{padding:'5px'}}> 
    <Card bordered={true}
          cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} 
          src={`http://localhost:3095/1001/nick1111/%EB%8F%99%EA%B8%B0%EB%B6%80%EC%97%AC1607408839105.png`} />}
    >
    <Meta title={<font style={{fontSize:'0.5vh'}}>와 진짜 대박이다 새우깡 호박깡</font>}
          style={{height:'15px'}}
    />
    </Card>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <Card bordered={true}
          cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} 
          src={`http://localhost:3095/1001/nick1111/%EC%97%90%EC%9D%B4%EC%8B%AF%ED%8C%941607324381388.jpg`} />}
    >
    <Meta title={<font style={{fontSize:'0.5vh'}}>와 진짜 음 말이 안되네 감자깡</font>} 
          style={{height:'15px'}}
    />
    </Card>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <Card  bordered={true}
           cover={<img alt="example" style={{width:'100%',height:'100px', objectFit:'cover'}} 
           src={`http://localhost:3095/1001/nick1111/%EB%8B%B4%EB%B0%B0%EB%95%A1%EA%B8%B4%EB%8B%A4%20-%20%EB%B3%B5%EC%82%AC%EB%B3%B81622693419222.jpg`} />}
    >
    <Meta title={<font style={{fontSize:'0.5vh'}}>와 진짜 음 말이 안되네 감자깡</font>}
          style={{height:'15px'}}
    />
    </Card>
  </Col>
</Row>



    <List
    style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
    itemLayout="horizontal"
    header={<div><b>자유 게시판</b></div>}
    footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1}}} scroll={false}><a><Button block>더 보기</Button></a></Link></div>}

    dataSource={data01}
    renderItem={item => (
      <List.Item>
      <Link href={'#'}>
      <a>
      <span className="bestSpan">BEST</span> 
        {item.title}
        <span className="countFontColor">[{item.commentCount}] </span>
      </a>
      </Link>
      </List.Item>
    )}
    />

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
    type:INDEX_PAGE_DATA01_REQUEST, 
    data:{postFlag:'1001',}, 
  });


  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 


});

export default Home; 
