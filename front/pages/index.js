import Link from 'next/link'
import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from  'axios'; 
import {END} from 'redux-saga'; 
import wrapper from '../store/configureStore';

import { Card, Col, Row, List, Typography, Button, Divider  } from 'antd';
const { Meta } = Card;

import { backImageUrl } from '../config/config';

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

  <Divider orientation="center">좋소!베스트</Divider>
  <Row style={{marginTop:'3%'}}>

  <Col span={8} style={{padding:'5px'}}> 
    <div style={{textAlign:'center'}}>
      <div>
          <img style={{width:'100%',height:'130px',objectFit:'cover'}}  src={`${backImageUrl}/1001/1일_1625651304854_계란빵.jpg`} />    
          <br />
          <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
          새우깡 와 진짜 대박이다 호박깡
          </div>
      </div>
    </div>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <div style={{textAlign:'center'}}>
      <div>
          <img style={{width:'100%',height:'130px',objectFit:'cover'}}  src={`${backImageUrl}/1001/1일_1625651304854_계란빵.jpg`} />    
          <br />
          <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
          와 진짜 대박이다 새우깡 호박깡
          </div>
      </div>
    </div>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <div style={{textAlign:'center'}}>
      <div>
          <img style={{width:'100%',height:'130px',objectFit:'cover'}}  src={`${backImageUrl}/1001/1일_1625651304854_계란빵.jpg`} />    
          <br />
          <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
          고고공 고고공 고고공 고고공
          </div>
      </div>
    </div>
  </Col>
</Row>


<Row style={{marginTop:'3%'}}>

  <Col span={8} style={{padding:'5px'}}> 
    <div style={{textAlign:'center'}}>
      <div>
          <img style={{width:'100%',height:'130px',objectFit:'cover'}}  src={`${backImageUrl}/1001/5오_1625652527876_계란빵.jpg`} />    
          <br />
          <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
          와 진짜 대박이다 새우깡 호박깡
          </div>
      </div>
    </div>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <div style={{textAlign:'center'}}>
      <div>
          <img style={{width:'100%',height:'130px',objectFit:'cover'}}  src={`${backImageUrl}/1001/5오_1625652527876_계란빵.jpg`} />    
          <br />
          <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
          와 진짜 음 말이 안되네 감자깡
          </div>
      </div>
    </div>
  </Col>

  <Col span={8} style={{padding:'5px'}}>
    <div style={{textAlign:'center'}}>
        <div>
            <img style={{width:'100%',height:'130px',objectFit:'cover'}}  src={`${backImageUrl}/1001/5오_1625652527876_계란빵.jpg`} />    
            <br />
            <div className="abbreviationMultiple" style={{marginTop:'3%'}}>
            ddd와 진짜 음 말이 안되네 감자깡호랑이 기운이 솟아나요!
            </div>
        </div>
    </div>
  </Col>
</Row>



    <List
    style={{marginTop:'3%',paddingLeft:'2%',paddingRight:'2%'}}
    itemLayout="horizontal"
    header={<div><b>좋좋소!</b></div>}
    footer={<div><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1001'}}} scroll={false}><a><Button block>더 보기</Button></a></Link></div>}

    dataSource={data01}
    renderItem={item => (
      <List.Item>
      <Link href={'#'}>
      <a className="abbreviation">
      <span className="bestSpan">BEST</span> 
        {item.title}ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
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
