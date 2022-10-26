import NossrToastEditor from '../../components/mainPosts_1001/NossrToastEditor'; 
import wrapper from '../../store/configureStore';
import {END} from 'redux-saga'; 
import axios from  'axios'; 
import ImageUploadComponent from '../../components/mainPosts_1001/ImageUploadComponent';


import 
    {
        LOAD_USER_REQUEST,
    } 
from '../../reducers/auth'; 
import 
    {
        POST_CLICKED_REQUEST,

    } 
from '../../reducers/mainPosts_1001'; 


const posting = ({posf,postId,userId,submitDay,imageExist,updateFlag}) =>{

    return (
        <>
            <NossrToastEditor posf={posf} postId={postId} userId={userId} submitDay={submitDay} imageExist={imageExist} updateFlag={updateFlag}/>
        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const posf=context.query.posf?context.query.posf:'';

    //-------------------------------- 게시글 수정 시 필요한 변수------------------------------------
    const postId=context.query.postid?context.query.postid:'';
    const userId=context.query.userid?context.query.userid:'';
    const submitDay=context.query.submitday?context.query.submitday:'';
    const imageExist=context.query.imageexist?parseInt(context.query.imageexist):0;
    const updateFlag=context.query.updateflag?context.query.updateflag:'';
    //---------------------------------------------------------------------------------------------
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
        data:{postFlag:posf,}
    });


    context.store.dispatch(END); 
    await context.store.sagaTask.toPromise(); 
    
    return {
        props :{posf,postId,userId,submitDay,imageExist,updateFlag}
    }

});

export default posting; 