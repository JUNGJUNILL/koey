import React, { useCallback,useEffect, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import wrapper from '../../store/configureStore';
import Comments1001 from '../../components/mainPosts_1001/mainPosts_1001_comments'
import CommentTextArea from '../../components/mainPosts_1001/mainPosts_1001_textArea'
import HeaderComponenet from '../../components/Header/HeaderComponenet'
import 
    {MAINPOSTS_1001_DETAIL_INFO_REQUEST,
     MAINPOSTS_1001_COMMENTS_REQUEST, 
     MAINPOSTS_1001_COMMENTINSERT_REQUEST,
     MAINPOSTS_1001_COMMENTLIKE_REQUEST,
     MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST,
     MAINPOSTS_1001_MAINPOSTLIKE_REQUEST,
     MAINPOST_1001_IMAGES_REQUEST
    } 
from '../../reducers/mainPosts_1001';
import Router ,{ useRouter } from 'next/router';
import 
    {LOAD_USER_REQUEST,} 
from '../../reducers/auth'; 

import {DislikeTwoTone, LikeTwoTone, UserOutlined, FieldTimeOutlined, EyeOutlined} from '@ant-design/icons'
import {Avatar, Button} from 'antd'
import custumDateFormat from  '../../util/custumDateFormat';
import { backImageUrl,AWSImageUrl } from '../../config/config';
import axios from  'axios'; 
import {END} from 'redux-saga'; 
import Head from "next/head";


//{nickName,postFlag,postId,submitDay}
const detailPage  = ({postId}) =>{




    return (  
    <div>
                  <Head>
                    <meta property="og:url" content="http://www.jscompany.live"></meta>
                    <meta property="og:image" content='https://www.hubpass.co.kr/external/images/a1001/jsMetaImage.gif'></meta>
                    <meta property="og:image:width" content="80"></meta>
                    <meta property="og:image:height" content="60"></meta>
                    <meta property="og:title" content={postId} />
                    <meta property="og:description" content={postId}></meta>     
                    </Head>
      <input type='text' value={postId} />

    </div>
        )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
 

  const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) { //쿠키 공유 방지 
      axios.defaults.headers.Cookie = cookie;
    }
  const postId   =  context.query.postId;
  const postFlag = context.query.postFlag;
  const submitDay = context.query.submitDay;
  const pid = context.query.pid; //게시글 작성자
  const nickName = context.query.userNickName; //현재 로그인한 사람의 닉네임
  const who       = context.query.who;        //현재 로그인한 사람의 아이디값


  /*
  //로그인 정보 유지 
  context.store.dispatch({
    type:LOAD_USER_REQUEST
  });


  //댓글 리스트 
  context.store.dispatch({
    type:MAINPOSTS_1001_COMMENTS_REQUEST, 
    data:{
      postId,
      nickName:encodeURIComponent(nickName),
      postFlag,
      who:who, 
      submitDay,
    }
  }); 
  
  //상세 정보 
  context.store.dispatch({
        type:MAINPOSTS_1001_DETAIL_INFO_REQUEST, 
        data:{
          postId,
          nickName:encodeURIComponent(nickName),
          postFlag,
          who:who,
          submitDay,
          helloworld
        }
  });


  //이미지 이름 가져오기
  context.store.dispatch({
    type:MAINPOST_1001_IMAGES_REQUEST, 
    data:{
      postId,
      nickName:encodeURIComponent(nickName),
      submitDay,
      postFlag,
      
        }
  });

  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 
  */
  return {
      props: {postId}, // will be passed to the page component as props
    } 

});

export default detailPage;