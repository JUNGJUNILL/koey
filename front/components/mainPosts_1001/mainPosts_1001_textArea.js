import React, { useCallback,useEffect, useState, createRef ,forwardRef,useImperativeHandle} from 'react'
import {Button,Input} from 'antd'
const { TextArea } = Input;
import { useSelector } from 'react-redux';

//forwardRef
//https://ko.reactjs.org/docs/react-api.html#reactforwardref

const  CommentTextArea= forwardRef(({postFlag,nickName,postId,userInfo,submitDay,insertComment} ,ref) =>{

    const focusRef = createRef(); 
    const [comment, setComment] = useState(''); 

    const {isWriting} = useSelector((state)=>state.mainPosts_1001); 
    
  
  //input box clear , focus
  useImperativeHandle(ref, () => ({
    clearInput : () => setComment(''),
    focusInput : () => focusRef.current.focus(),
  }));


  //댓글 입력 textArea 
  const onChageComment =useCallback((e)=>{

    if(comment.length === 300){
      alert('300자 이상 입력 할 수 없습니다.'); 
      return; 
    }
    setComment(e.target.value); 

  },[comment]); 
  


    



return (
    <>
  
    <TextArea value={comment} ref={focusRef} onChange={onChageComment} placeholder={userInfo ? "댓글을 작성해 보세요!" : "댓글 작성(로그인이 필요한 서비스 입니다.)"} readOnly={userInfo ? false : true} />
    <div style={{margin:"1%",display:"block",float:"left"}}>
      {comment ? comment.length  : 0 } &#47; 300
    </div>

    {userInfo && comment.length > 
        0 
        ?
        <div style={{margin:"1%",display:"block",float:"right"}}>
            <Button type="primary" loading={isWriting} onClick={()=>insertComment(postFlag,postId,nickName,comment,submitDay)}>댓글달기</Button>
        </div>
        :
        ""
    }




    </>
)

})

export default CommentTextArea; 