import React, { useCallback,useEffect, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router ,{ useRouter } from 'next/router';

import wrapper from '../../store/configureStore';
import {END} from 'redux-saga'; 
import axios from  'axios'; 

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
     MAINPOST_1001_IMAGES_REQUEST,
     POST_CLICKED_REQUEST
    } 
from '../../reducers/mainPosts_1001';

import 
    {LOAD_USER_REQUEST,} 
from '../../reducers/auth'; 

import {DislikeTwoTone, LikeTwoTone, UserOutlined, FieldTimeOutlined, EyeOutlined} from '@ant-design/icons'
import {Avatar, Button} from 'antd'
import custumDateFormat from  '../../util/custumDateFormat';
import { backImageUrl,AWSImageUrl } from '../../config/config';

import GoogleAds_DetailPage from '../../components/Ads/GooleAds_DetailPaage';
import GooleAds_comment_footer from '../../components/Ads/GooleAds_comment_footer';




//{nickName,postFlag,postId,submitDay}
const detailPage  = ({nickName,postFlag,postId,submitDay,who,pid}) =>{
  

  const dispatch = useDispatch(); 
  const {mainPosts_1001Info , 
         mainPosts_1001Comments,
         mainPosts_1001CommentByComments,
         imageSrc
        } = useSelector((state)=>state.mainPosts_1001); 

  const {userInfo,userid}      = useSelector((state)=>state.auth);
  const ref = createRef(); 
  const blank_pattern = /^\s+|\s+&/g;  
  const [unfoldList,setUnfoldList] = useState('fold'); 

  let contentImages=""; 
  let firstImage="";
  if(imageSrc.length > 0 ){
    firstImage = imageSrc[0].src;
    imageSrc.map((v)=>{
      //하드 디스크에서 가져온 이미지
      //contentImages=contentImages +  `<figure ><img src="${backImageUrl}/${postFlag}/${v.src}"></figure>`
      process.env.NODE_ENV==='production'
      ?
      contentImages=contentImages +  `<figure ><img src="${AWSImageUrl}/images/${postFlag}/${v.src}"></figure>`
      :
      contentImages=contentImages +  `<figure ><img src="${backImageUrl}/${postFlag}/${v.src}"></figure>` 
      //aws s3용
      
    }); 
}


  //게시글 좋아요, 실어요 버튼
  const postLikeBtn = useCallback((likeFlag,submitDay)=>{

    if(!userInfo){
      alert('로그인이 필요한 서비스 입니다.'); 
      return;
    }

    if(mainPosts_1001Info[0].flag==='Y'){
      
      alert('이미 좋아요! 싫어요! 했습니다.');       
      return; 
    
    }
    //게시글 좋아요!
    dispatch({
            type:MAINPOSTS_1001_MAINPOSTLIKE_REQUEST,
            data:{
              postId,
              pid:pid,
              postFlag,
              who: userid, 
              flag:likeFlag, 
              submitDay,
              mainPosts_1001Info:[...mainPosts_1001Info], 
            }
    }); 
  

  },[mainPosts_1001Info])


  //댓글 좋아요, 싫어요 버튼 
  const likeBtn =useCallback((commentid,flag,likeDislike,submitDay)=>{
      if(!userInfo){
        alert('로그인이 필요한 서비스 입니다.'); 
        return;
      }

      if(flag==="Y"){
        
        alert('이미 좋아요! 싫어요! 했습니다.'); 
        return; 
  
      }else{

        //댓글 좋아요!
        dispatch({
          type:MAINPOSTS_1001_COMMENTLIKE_REQUEST, 
          data:{
            commentid,
            postFlag,
            postId,
            flag: likeDislike ,
            who: userid,
            pid:pid,
            submitDay,
            mainPosts_1001Comments:[...mainPosts_1001Comments],
          }
      }); 

    }

    
    },[mainPosts_1001Comments]); 


  //댓글 입력 
  const insertComment = useCallback((postFlag,pid,postId,nickName,comment,submitDay)=>{
    if(comment.length === 0 || comment.replace(blank_pattern,'')===""){
      
         
        alert('댓글을 입력해 주세요!'); 
        if(ref.current){
          ref.current.focusInput(); 
        } 
        return; 
        }
    
        if(comment.length === 300){
          alert('300자 이상 입력 할 수 없습니다.'); 
          return; 
        }

        
          //댓글 입력
          dispatch({
            type:MAINPOSTS_1001_COMMENTINSERT_REQUEST, 
            data:{
              postId,
              postFlag,
              pid,
              nickName,
              who:userid, 
              comment,
              submitDay,
            }
        });

        setUnfoldList('fold'); 


         //인풋 초기화, 포커스 
        if(ref.current){
          ref.current.clearInput(); 
          ref.current.focusInput(); 
        }


      },[mainPosts_1001Comments,ref]);



      //대댓글 리스트 
      const commentByCommentList =useCallback((postFlag,pid,nickName,postId,commentId,clickCommentId,unfoldList,submitDay)=>{
               
                if(unfoldList==='unfold' && commentId === clickCommentId){
                  setUnfoldList('fold'); 
                }else{
                  setUnfoldList('unfold'); 
                }

                dispatch({
                    type:MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST,
                    data:{
                        postFlag,
                        pid,
                        nickName,
                        postId,
                        commentId,
                        who:userInfo,
                        submitDay
                    }
                });      

              
               
      },[mainPosts_1001CommentByComments,unfoldList]); 



    return (
      
    <div >
    {/* 
    <div style={{width:"100%",height:"auto", border:"1px solid", borderColor:"#8cc49c",marginTop:"1%"}}>
      광고입니다.
    </div>
    */}


      {/*메타 테그--------------------------------------------------------------------------------*/}
      { mainPosts_1001Info &&
        <HeaderComponenet posf={postFlag} title={mainPosts_1001Info[0].title} image={firstImage} contents={mainPosts_1001Info[0].content}/>
      }

    {/*상세 페이지 타이틀--------------------------------------------------------------------------------*/}
      <div className='divTableDetail' style={{marginTop:'3%'}}>
            <div className='divTableRowTh'>
                <div className='divTableCellTh'><h3><b>{mainPosts_1001Info[0].title}</b></h3></div>
           </div>
           <div className='divTableRowTh'>
                <div className='divTableCellTh'><Avatar size="small" icon={<UserOutlined />} />&nbsp;{mainPosts_1001Info[0].userNickName}</div>
           </div>
           <div className='divTableRowTh'>
                <div className='divTableCellTh'>
                <FieldTimeOutlined/>&nbsp;{custumDateFormat(mainPosts_1001Info[0].createdDate)}&nbsp;&nbsp;
                <EyeOutlined />&nbsp;{mainPosts_1001Info[0].hit}&nbsp;&nbsp;
                <LikeTwoTone twoToneColor={'#ff6600'} />&nbsp;{mainPosts_1001Info[0].good}&nbsp;&nbsp;
                <DislikeTwoTone twoToneColor={'#ff6600'} />&nbsp;{mainPosts_1001Info[0].bad}   
                </div>
           </div>
      </div>
      
      <div style={{padding:'3%'}}>
      <hr style={{opacity:'0.3'}}/>
      </div>
      
    {/*상세 페이지 타이틀--------------------------------------------------------------------------------*/}
   





    {/*상세 페이지 이미지--------------------------------------------------------------------------------*/}
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"1%"}}>
        <div dangerouslySetInnerHTML={{__html:imageSrc.length > 0 ? contentImages : ''}}/>
     </div> 
    {/*상세 페이지 이미지--------------------------------------------------------------------------------*/}
    
    
    {/*상세 페이지 글--------------------------------------------------------------------------------*/}

        <div style={{padding:'3%'}} dangerouslySetInnerHTML={{__html:mainPosts_1001Info[0].content}} />
 
    {/*상세 페이지 글--------------------------------------------------------------------------------*/}
    









    {/*좋아요 싫어요 버튼--------------------------------------------------------------------------------*/}
    <div className='divTableDetail'>
      <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Button onClick={()=>postLikeBtn('good',submitDay)}><LikeTwoTone  twoToneColor={mainPosts_1001Info[0].clicked === 'good' ? "#ff0000":"#ff6600"}/></Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={()=>postLikeBtn('bad',submitDay)}><DislikeTwoTone twoToneColor={mainPosts_1001Info[0].clicked ==='bad' ? "#ff0000":"#ff6600"}/></Button>
      </div>
    </div>
    <br />
    {/*좋아요 싫어요 버튼--------------------------------------------------------------------------------*/}

    {/*구글 광고*/}
    <GoogleAds_DetailPage />
    <br/>



    {/*댓글 입력 --------------------------------------------------------------------------------*/}
    <div><b>댓글 {mainPosts_1001Comments.length}</b></div>
    <CommentTextArea   
            postFlag={postFlag}
            pid={pid} 
            nickName={nickName} 
            postId={postId} 
            userInfo={userInfo}
            insertComment={insertComment}
            submitDay={submitDay}
            ref={ref}
   />
    {/*댓글 입력 --------------------------------------------------------------------------------*/}




    {/*댓글 리스트--------------------------------------------------------------------------------*/}
    <div className="divTable">
      {mainPosts_1001Comments && mainPosts_1001Comments.map((v,i)=>

        <Comments1001 
              key={i} 
              postFlag={postFlag} 
              pid={pid}
              nickName={v.userNickName}
              loginNickName={userInfo}
              postId={postId} 
              userInfo={userid}
              submitDay={submitDay}
    
              commentId={v.commentId} 
              comment={v.comment} 
              who={v.who} 
              flag={v.flag} 

              good={v.good}
              bad={v.bad}      
              createdDate={v.createdDate} 
    
              likeBtn={likeBtn}

              clickedComponent={v.clickedComponent}
              likeDislikeflag={v.likeDislikeflag}
              
              byCommentCount={v.byCommentCount}
              commentByCommentList={commentByCommentList}
              mainPosts_1001CommentByComments={mainPosts_1001CommentByComments[0] && mainPosts_1001CommentByComments[0].commentId === v.commentId ? mainPosts_1001CommentByComments : ''}
              unfoldList={unfoldList}

              />
      )
    
    }
    </div>
    {/*댓글 리스트--------------------------------------------------------------------------------*/}

    {/*구글 광고*/}
    <GooleAds_comment_footer />
    </div>
        )
}

//서버 사이드 렌더링
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  //const array = context.query.postId.split(':'); 
  const postId   = context.query.postId;
  const nickName = context.query.userNickName; 
  const postFlag = context.query.postFlag; 
  const submitDay = context.query.submitDay;
  const who       = context.query.who;
  const pid       = context.query.pid;


  const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) { //쿠키 공유 방지 
      axios.defaults.headers.Cookie = cookie;
    }
  
  //로그인 정보 유지 
  context.store.dispatch({
    type:LOAD_USER_REQUEST
  });

    //nav background 유지
    context.store.dispatch({
      type:POST_CLICKED_REQUEST,
      data:{postFlag:postFlag,}
    });


  //댓글 리스트 
  context.store.dispatch({
    type:MAINPOSTS_1001_COMMENTS_REQUEST, 
    data:{
      postId,
      pid:pid,
      nickName:encodeURIComponent(nickName),
      postFlag :postFlag,
      who:who, 
      submitDay:submitDay,
    }
  }); 
  
  //상세 정보 
  context.store.dispatch({
        type:MAINPOSTS_1001_DETAIL_INFO_REQUEST, 
        data:{
          postId:postId,
          pid:encodeURIComponent(pid),
        
          postFlag:postFlag,
          who:who,
          submitDay,
          submitDay:submitDay,
        }
  });


  //이미지 이름 가져오기
  context.store.dispatch({
    type:MAINPOST_1001_IMAGES_REQUEST, 
    data:{
      postId:postId,
      pid:encodeURIComponent(pid),
      submitDay:submitDay,
      postFlag:postFlag,
      
        }
  });

  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 
  
  return {
      props: {nickName,postFlag,postId,submitDay,who,pid}, // will be passed to the page component as props
    } 

});

export default detailPage;