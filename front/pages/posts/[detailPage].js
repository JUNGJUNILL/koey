import React, { useCallback,useEffect, useState, createRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
     MAINPOSTS_REMOVE_REQUEST
    } 
from '../../reducers/mainPosts_1001';
import Router ,{ useRouter } from 'next/router';
import 
    {LOAD_USER_REQUEST,} 
from '../../reducers/auth'; 

import {DislikeTwoTone,LikeTwoTone,UserOutlined,FieldTimeOutlined,EyeOutlined,CopyOutlined,CheckOutlined} from '@ant-design/icons'
import {Avatar, Button} from 'antd'
import custumDateFormat from  '../../util/custumDateFormat';
import { backImageUrl,AWSImageUrl,Url } from '../../config/config';

import GoogleAds_DetailPage from '../../components/Ads/GooleAds_DetailPaage';
import GooleAds_comment_footer from '../../components/Ads/GooleAds_comment_footer';
import GooleAds_DetailPage_Top from '../../components/Ads/GooleAds_DetailPage_Top'; 


//{nickName,postFlag,postId,submitDay}
const detailPage  = () =>{

  const dispatch = useDispatch(); 
  const router           = useRouter(); 

  const {detailPage} =router.query; 
  const postId   =  router.query.postId;
  const pid = router.query.pid;
  const postFlag = router.query.postFlag;
  const submitDay = router.query.submitDay;


  const {userInfo,userid}      = useSelector((state)=>state.auth);
  let nickName = userInfo;      //현재 로그인한 사람의 닉네임
  let who       = userid;        //현재 로그인한 사람의 아이디값

  useEffect(()=>{

    //url을 브라우져 주소창에 바로 입력 후 엔터 쳤을 때 에러 뜨는거 해결하는 로직 
    //if(!detailPage){

   //   return null;

   // }else{

    //로그인 정보
    dispatch({
      type:LOAD_USER_REQUEST
    });

    //댓글 정보
    dispatch({
      type:MAINPOSTS_1001_COMMENTS_REQUEST, 
      data:{
        postId :postId,
        pid :pid ,
        nickName:encodeURIComponent(nickName),
        postFlag :postFlag,
        who:who, 
        submitDay:submitDay,
      }
    }); 
    //상세 정보 
    dispatch({
          type:MAINPOSTS_1001_DETAIL_INFO_REQUEST, 
          data:{
            postId:postId,
            pid:encodeURIComponent(pid),
            postFlag:postFlag,
            who:who,
            submitDay:submitDay,
          }
    });
  
  
    //이미지 이름 가져오기
    dispatch({
      type:MAINPOST_1001_IMAGES_REQUEST, 
      data:{
        postId:postId,
        pid:encodeURIComponent(pid),
        submitDay:submitDay,
        postFlag:postFlag,
        
          }
    });
  //}
  },[
   // detailPage,
    postId   ,
    pid      ,
    nickName ,
    postFlag ,
    submitDay,
    who      ,
  ])

  const {mainPosts_1001Info , 
         mainPosts_1001Comments,
         mainPosts_1001CommentByComments,
         imageSrc,

         postDeleting,
         tags, 
        } = useSelector((state)=>state.mainPosts_1001); 


  
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

      //게시글 삭제
      const deletePost =useCallback((postFlag,postId,userId,submitDay) =>{

        if(window.confirm('정말로 삭제하시겠습니까?')){
          dispatch({
            type:MAINPOSTS_REMOVE_REQUEST,
            data:{postflag:postFlag,
                  postid:postId,
                  userid:userId,
                  submitday:submitDay,}
          });      
          alert('게시물이 삭제되었습니다.');
          router.push({pathname:'/posts/mainPosts_1001',
          query:{nowPage:1, 
                posf:postFlag
               }
          
          });

        }else{
          return;
        }

      },[]);
  
       //게시글 수정
       const updatePost=(postFlag,postId,userId,submitDay,postCategory)=>{
        const imageExist = imageSrc.length;
        const queryParam =`?posf=${postFlag}&postid=${postId}&userid=${userId}&submitday=${submitDay}&imageexist=${imageExist}&updateflag=update`
        postCategory==='common'
        ?router.push('/posts/postEdit'+queryParam , '/posts/postEdit')
        :router.push('/posts/posting'+queryParam , '/posts/posting')
       };
       
       const copyUrl = createRef();
       const [clickCopy,setClickCopy] =useState(true); 

       //url 복사
       //https, localhost에서만 작동함 
       const onClickCopy =async ()=>{
          const copyValue = copyUrl.current.value; 
          setClickCopy(false); 
          try{
            await navigator.clipboard.writeText(copyValue);
          }catch(e){
            alert('복사에 실패 하였습니다 - 브라우저 문제');
          }
       }

       const onClickDeprecated=()=>{
        const el = copyUrl.current; 
        el.select(); 
        setClickCopy(false); 
        document.execCommand("copy");

      }

       const searchTags=(v)=>{

        router.push(`/posts/mainPosts_1001?nowPage=1&posf=${postFlag}&searchValue=${v}&searchCondition=tags`);

      }


    return (
      
    <div >
    {/*구글 광고*/} 
    {/*mainPosts_1001Info.length > 0 && <GooleAds_DetailPage_Top/>*/}
           

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
            {/*로그인 했을 경우 삭제, 수정 버튼이 보인다.*/}
            {userInfo===mainPosts_1001Info[0].userNickName &&          
                <div className='divTableRowTh'>
                  <div className='divTableCellTh'>
                      <Button onClick={()=>deletePost(postFlag,mainPosts_1001Info[0].postId ,mainPosts_1001Info[0].userid,mainPosts_1001Info[0].submitDay)} loading={postDeleting}>삭제</Button>
                      <Button onClick={()=>updatePost(postFlag,mainPosts_1001Info[0].postId ,mainPosts_1001Info[0].userid,mainPosts_1001Info[0].submitDay,mainPosts_1001Info[0].postCategory)}>수정</Button>
                  </div>
              </div>
            }

              <div className='divTableRowTh'>
                  <div className='divTableCellTh' >
                      <input type="text"  ref={copyUrl} className='abbreviation02' value={`${Url.substring(0,Url.indexOf('://')+3).concat(Url.substring(Url.indexOf('.')+1))}/posts/detailPage?postId=${postId}&postFlag=${postFlag}&submitDay=${submitDay}&pid=${pid}`} /> 
                      &nbsp;&nbsp;                      
                      {clickCopy &&
                        <CopyOutlined  style={{fontSize:'19px',opacity:0.6}} onClick={onClickDeprecated}/>
                      }
                      {!clickCopy &&
                       <span style={{color:'#1d8102'}}><CheckOutlined />&nbsp;복사됨</span>
                      }

                      
                   
                  </div>
              </div>
     
      </div>
      
      <div style={{padding:'3%'}}>
      <hr style={{opacity:'0.3'}}/>
      </div>
      
    {/*상세 페이지 타이틀--------------------------------------------------------------------------------*/}
   





    {/*상세 페이지 이미지--------------------------------------------------------------------------------*/}
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"1%"}}>
        <div dangerouslySetInnerHTML={{__html:imageSrc.length > 0 && mainPosts_1001Info[0].postCategory==='common' ? contentImages : ''}}/>
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

    {/*태그 정보--------------------------------------------------------------------------------*/}
    <div style={{padding:'3%'}}>
      {tags.length > 0 && tags.map((v)=>(
        <div style={{display:'inline-block'}}><Button size='small' onClick={()=>searchTags(v)}>#{v}</Button>&nbsp;</div>
      ))}
    </div>
    {/*태그 정보--------------------------------------------------------------------------------*/}

    {/*구글 광고*/}
    {mainPosts_1001Info.length > 0 && <GoogleAds_DetailPage/>}
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
    {/*구글 광고*/}
    {/*mainPosts_1001Info.length > 0 && <GoogleAds_DetailPage/>*/}
    </div>
    {/*댓글 리스트--------------------------------------------------------------------------------*/}
    

    {/*mainPosts_1001Info.length > 0 && <GooleAds_comment_footer/>*/}

    </div>
        )
}


export default detailPage;