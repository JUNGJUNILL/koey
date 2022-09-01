import axios from 'axios'
import {all,fork,takeLatest,takeEvery ,put, delay,call} from 'redux-saga/effects'; 
import 
    {
        MAINPOSTS_1001_LIST_REQUEST,
        MAINPOSTS_1001_LIST_SUCCESS,
        MAINPOSTS_1001_LIST_FAILURE,    

        MAINPOSTS_1001_DETAIL_INFO_REQUEST,
        MAINPOSTS_1001_DETAIL_INFO_SUCCESS,
        MAINPOSTS_1001_DETAIL_INFO_FAILURE,

        MAINPOSTS_1001_COMMENTS_REQUEST, 
        MAINPOSTS_1001_COMMENTS_SUCCESS, 
        MAINPOSTS_1001_COMMENTS_FAILURE, 

        MAINPOSTS_1001_COMMENTINSERT_REQUEST,
        MAINPOSTS_1001_COMMENTINSERT_SUCCESS,
        MAINPOSTS_1001_COMMENTINSERT_FAILURE, 

        MAINPOSTS_1001_COMMENTLIKE_REQUEST,
        MAINPOSTS_1001_COMMENTLIKE_SUCCESS,
        MAINPOSTS_1001_COMMENTLIKE_FAILURE,
        
        MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST,
        MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS,
        MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE,

        MAINPOSTS_1001_MAINPOSTLIKE_REQUEST,
        MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS,
        MAINPOSTS_1001_MAINPOSTLIKE_FAILURE,

        MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST,
        MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS,
        MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE, 

        MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST,
        MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS,
        MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE,

        MAINPOST_1001_INSERT_REQUEST,
        MAINPOST_1001_INSERT_SUCCESS,
        MAINPOST_1001_INSERT_FAILURE,

        UPLOAD_IMAGES_REQUEST,
        UPLOAD_IMAGES_SUCCESS,
        UPLOAD_IMAGES_FAILURE,

        MAINPOST_1001_IMAGES_REQUEST,
        MAINPOST_1001_IMAGES_SUCCESS,
        MAINPOST_1001_IMAGES_FAILURE,

        MAINPOSTS_REMOVE_REQUEST,
        MAINPOSTS_REMOVE_SUCCESS,
        MAINPOSTS_REMOVE_FAILURE,

        MAINPOSTS_UPDATE_REQUEST,
        MAINPOSTS_UPDATE_SUCCESS,
        MAINPOSTS_UPDATE_FAILURE,

        MAINPOST_1001_IMAGE_REMOVE_REQUEST,
        MAINPOST_1001_IMAGE_REMOVE_SUCCESS,
        MAINPOST_1001_IMAGE_REMOVE_FAILURE,
        
    } 
from '../reducers/mainPosts_1001'; 



//mainPost_1001 리스트 
//-----------------------------------------------------------------------------------
function APImainPosts_1001List(data){
    return axios.post('/mainPosts_1001',{data},{withCredentials:true})
}

function* sagaMainPosts_1001List(action){

    try{
      const result = yield call(APImainPosts_1001List,action.data);  

      yield  put({
            type:MAINPOSTS_1001_LIST_SUCCESS, 
            data:{dataArray:result.data},
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_LIST_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchMainPosts_1001(){
    yield takeLatest(MAINPOSTS_1001_LIST_REQUEST,sagaMainPosts_1001List); 
}
//-----------------------------------------------------------------------------------




//mainPost_1001 상세정보 
//-----------------------------------------------------------------------------------
function APImainPosts_1001Detail(data){
    return axios.post('/mainPosts_1001/mainPosts_1001Detail',{data},{withCredentials:true})
}

function* sagaMainPosts_1001Detail(action){

    try{
      const result = yield call(APImainPosts_1001Detail,action.data); 
      yield  put({
            type:MAINPOSTS_1001_DETAIL_INFO_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_DETAIL_INFO_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchMainPosts_1001Detail(){
    yield takeLatest(MAINPOSTS_1001_DETAIL_INFO_REQUEST,sagaMainPosts_1001Detail); 
}
//-----------------------------------------------------------------------------------



//mainPost_1001 상세 정보 댓글 리스트
//-----------------------------------------------------------------------------------
function APImainPosts_1001CommentList(data){
    return axios.post('/mainPosts_1001/mainPosts_1001Comments',{data},{withCredentials:true})
}


function* sagaMainPosts_1001CommentList(action){

    try{
      const result = yield call(APImainPosts_1001CommentList,action.data); 
      yield  put({
            type:MAINPOSTS_1001_COMMENTS_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_COMMENTS_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001CommentList(){
    yield takeLatest(MAINPOSTS_1001_COMMENTS_REQUEST,sagaMainPosts_1001CommentList); 
}
//-----------------------------------------------------------------------------------


//mainPost_1001 상세 정보 대댓글 리스트
//-----------------------------------------------------------------------------------

function APImainPosts_1001CommentByCommentList(data){
    return axios.post('/mainPosts_1001/mainPosts_1001CommentByComments',{data},{withCredentials:true})
}


function* sagaMainPosts_1001CommentByCommentList(action){

    try{
      const result = yield call(APImainPosts_1001CommentByCommentList,action.data); 
      yield  put({
            type:MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS, 
            data:{array:result.data, param:action.data},
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001CommentByCommentList(){
    yield takeLatest(MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST,sagaMainPosts_1001CommentByCommentList); 
}
//-----------------------------------------------------------------------------------






//mainPost_1001 댓글 입력
//-----------------------------------------------------------------------------------
function APImainPosts_1001CommentInsert(data){
    return axios.post('/mainPosts_1001/mainPosts_1001CommentInsert',{data},{withCredentials:true})
}


function* sagaMainPosts_1001CommentInsert(action){

    try{
      const result = yield call(APImainPosts_1001CommentInsert,action.data); 
      const array=[]; 
      result.data.map((v,i)=>{
        result.data[0].kk='addComment'; 
        array.push(v); 
      }); 
      

      yield  put({
            type:MAINPOSTS_1001_COMMENTINSERT_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_COMMENTINSERT_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001CommentInsert(){
    yield takeLatest(MAINPOSTS_1001_COMMENTINSERT_REQUEST,sagaMainPosts_1001CommentInsert); 
}
//-----------------------------------------------------------------------------------

//mainPost_1001 대댓글 입력
//-----------------------------------------------------------------------------------
function APImainPosts_1001CommentByCommentInsert(data){
    return axios.post('/mainPosts_1001/mainPosts_1001CommentByCommentInsert',{data},{withCredentials:true})
}


function* sagaMainPosts_1001CommentByCommentInsert(action){

    try{
      const result = yield call(APImainPosts_1001CommentByCommentInsert,action.data); 

      yield  put({
            type:MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS,
            data:{array:result.data, param:action.data},
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            
            type:MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001CommentByCommentInsert(){
    yield takeLatest(MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST,sagaMainPosts_1001CommentByCommentInsert); 
}
//-----------------------------------------------------------------------------------





//게시글 LIKE / DISLIKE 
//-----------------------------------------------------------------------------------
function APImainPosts_1001Like(data){
    return axios.post('/mainPosts_1001/mainPosts_1001Like',{data},{withCredentials:true})
}


function* sagaMainPosts_1001Like(action){

    try{
        const result = yield call(APImainPosts_1001Like,action.data); 
        action.data.mainPosts_1001Info[0] = {...action.data.mainPosts_1001Info[0],
                                                flag :'Y',
                                                good : action.data.flag === 'good' ? parseInt(action.data.mainPosts_1001Info[0].good) + 1 : action.data.mainPosts_1001Info[0].good,
                                                bad  : action.data.flag === 'bad'  ? parseInt(action.data.mainPosts_1001Info[0].bad)  + 1 : action.data.mainPosts_1001Info[0].bad,
                                                clicked : action.data.flag === 'good' ? 'good' : 'bad',     
                                            }
      yield  put({
            type:MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS, 
            //이런식으로도 리듀서에 데이터를 보낼 수 있다. 
            //data:{array : action.data.mainPosts_1001Comments, values :action.data.commentid },
            data:{array:action.data.mainPosts_1001Info},
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_MAINPOSTLIKE_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001Like(){
    yield takeLatest(MAINPOSTS_1001_MAINPOSTLIKE_REQUEST,sagaMainPosts_1001Like); 
}
//-----------------------------------------------------------------------------------



//mainPost_1001 댓글 LIKE / DISLIKE 
//-----------------------------------------------------------------------------------
function APImainPosts_1001CommentLike(data){
    return axios.post('/mainPosts_1001/mainPosts_1001CommentLike',{data},{withCredentials:true})
}


function* sagaMainPosts_1001CommentLike(action){

    try{
      const result = yield call(APImainPosts_1001CommentLike,action.data); 
     
        action.data.mainPosts_1001Comments.map((v,i)=>{
            if(v.commentId === action.data.commentid){
                action.data.mainPosts_1001Comments[i] = {...action.data.mainPosts_1001Comments[i], 
                                                            clickedComponent:action.data.commentid,
                                                            flag:'Y', 
                                                            likeDislikeflag:action.data.flag}
            }
        }); 
        
      yield  put({
            type:MAINPOSTS_1001_COMMENTLIKE_SUCCESS, 
            //이런식으로도 리듀서에 데이터를 보낼 수 있다. 
            //data:{array : action.data.mainPosts_1001Comments, values :action.data.commentid },
            data:action.data.mainPosts_1001Comments,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_COMMENTLIKE_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001CommentLike(){
    yield takeLatest(MAINPOSTS_1001_COMMENTLIKE_REQUEST,sagaMainPosts_1001CommentLike); 
}
//-----------------------------------------------------------------------------------



//mainPost_1001 대댓글 LIKE / DISLIKE 
//-----------------------------------------------------------------------------------
function APImainPosts_1001CommentByCommentsLike(data){
    return axios.post('/mainPosts_1001/mainPosts_1001CommentByCommentsLike',{data},{withCredentials:true})
}


function* sagaMainPosts_1001CommentByCommentsLike(action){

    try{
      const result = yield call(APImainPosts_1001CommentByCommentsLike,action.data); 
        
     action.data.mainPosts_1001CommentByComments.map((v,i)=>{
        if(v.byCommentId === action.data.byCommentId){
            action.data.mainPosts_1001CommentByComments[i] = {...action.data.mainPosts_1001CommentByComments[i],
                                                                clickedComponent:action.data.byCommentId,
                                                                flag:'Y',
                                                                likeDislikeflag:action.data.flag,
                                                                }
        }
     });


      yield  put({
            type:MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS, 
            data:action.data.mainPosts_1001CommentByComments,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001CommentByCommentsLike(){
    yield takeLatest(MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST,sagaMainPosts_1001CommentByCommentsLike); 
}
//-----------------------------------------------------------------------------------


//게시물 인서트
//-----------------------------------------------------------------------------------
function APImainPost_1001Insert(data){

    return axios.post('/mainPosts_1001/postInsert',{data})

}

function* sagaMainPost_1001Insert(action){

    try{

        const result = yield call(APImainPost_1001Insert,action.data); 
        yield  put({
              type:MAINPOST_1001_INSERT_SUCCESS, 
              data:result.data,
          });
  
      }catch(e){
  
          console.error(e); 
          alert('error', e); 
          yield put({
              type:MAINPOST_1001_INSERT_FAILURE, 
              error: e, 
          }); 
      }

}


function* watchInsertMainPost_1001(){
    yield takeLatest(MAINPOST_1001_INSERT_REQUEST,sagaMainPost_1001Insert); 
}
//-----------------------------------------------------------------------------------


//이미지 업로드
//-----------------------------------------------------------------------------------
function APImainPosts_1001UploadImage(data){
    return axios.post(`/mainPosts_1001/images?postFlag=${data.postFlag}&user=${data.user}`,data.images,{withCredentials:true})
}


function* sagaMainPosts_1001UploadImage(action){

    try{
      const result = yield call(APImainPosts_1001UploadImage,action.data); 
      yield  put({
            type:UPLOAD_IMAGES_SUCCESS, 
            data:{filnameArray:result.data , updateflag:action.data.isUpdate},
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:UPLOAD_IMAGES_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001UploadImage(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST,sagaMainPosts_1001UploadImage); 
}
//-----------------------------------------------------------------------------------



//이미지 이름 가져오기
//-----------------------------------------------------------------------------------
function APImainPosts_1001ImageName(data){
    return axios.post('/mainPosts_1001/imagename',{data},{withCredentials:true})
}


function* sagaMainPosts_1001ImageName(action){

    try{
      const result = yield call(APImainPosts_1001ImageName,action.data); 
      yield  put({
            type:MAINPOST_1001_IMAGES_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOST_1001_IMAGES_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001ImageName(){
    yield takeLatest(MAINPOST_1001_IMAGES_REQUEST,sagaMainPosts_1001ImageName); 
}
//-----------------------------------------------------------------------------------

//이미지 제거하기
//-----------------------------------------------------------------------------------
function APImainPosts_1001ImageDelete(data){
    return axios.post('/mainPosts_1001/imageDelete',{data},{withCredentials:true})
}


function* sagaMainPosts_1001ImageDelete(action){

    try{
      //게시글 수정 화면에서 파일 업로드 후 제거 눌렀을 경우
      if(action.data.update==='Y') return; 

      const result = yield call(APImainPosts_1001ImageDelete,action.data); 
      yield  put({
            type:MAINPOST_1001_IMAGE_REMOVE_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOST_1001_IMAGE_REMOVE_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001ImageDelete(){
    yield takeLatest(MAINPOST_1001_IMAGE_REMOVE_REQUEST,sagaMainPosts_1001ImageDelete); 
}
//-----------------------------------------------------------------------------------



//게시글 삭제하기
//-----------------------------------------------------------------------------------
function APImainPosts_1001Delete(data){
    return axios.post('/mainPosts_1001/postDelete',{data},{withCredentials:true})
}


function* sagaMainPosts_1001Delete(action){

    try{
      yield call(APImainPosts_1001Delete,action.data); 
      yield  put({
            type:MAINPOSTS_REMOVE_SUCCESS, 
            data:'게시글이 삭제되었습니다.',
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_REMOVE_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001Delete(){
    yield takeLatest(MAINPOSTS_REMOVE_REQUEST,sagaMainPosts_1001Delete); 
}
//-----------------------------------------------------------------------------------



//게시글 수정하기
//-----------------------------------------------------------------------------------
function APImainPosts_1001Update(data){
    return axios.post('/mainPosts_1001/postUpdate',{data},{withCredentials:true})
}


function* sagaMainPosts_1001Update(action){

    try{
      yield call(APImainPosts_1001Update,action.data); 
      yield  put({
            type:MAINPOSTS_UPDATE_SUCCESS, 
            data:'게시글이 수정되었습니다.',
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:MAINPOSTS_UPDATE_FAILURE, 
            error: e, 
        }); 
    }
}


function* watchMainPosts_1001Update(){
    yield takeLatest(MAINPOSTS_UPDATE_REQUEST,sagaMainPosts_1001Update); 
}
//-----------------------------------------------------------------------------------



export default function* mainPosts_1001Saga(){

    yield all([
        fork(watchMainPosts_1001), 
        fork(watchMainPosts_1001Detail), 
        fork(watchMainPosts_1001CommentList), 
        fork(watchMainPosts_1001CommentInsert), 
        fork(watchMainPosts_1001CommentLike), 
        fork(watchMainPosts_1001CommentByCommentList), 
        fork(watchMainPosts_1001CommentByCommentInsert), 
        fork(watchMainPosts_1001CommentByCommentsLike), 
        fork(watchMainPosts_1001Like),
        fork(watchMainPosts_1001UploadImage),
        fork(watchInsertMainPost_1001), 
        fork(watchMainPosts_1001ImageName), 
        fork(watchMainPosts_1001ImageDelete),
        fork(watchMainPosts_1001Delete),
        fork(watchMainPosts_1001Update),
     ])
}