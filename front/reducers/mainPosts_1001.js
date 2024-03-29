import immerProduce from '../util/produce';


export const  initialState = {

    isWriting          : false, 
    posf               :null,
    mainPosts_1001     : [], 
    mainPosts_1001Info : [{}], 
                        //하 이것때매 몇시간을 날려 먹었는지.. 아크릴 새우님이 해결법을 알려주심
    mainPosts_1001Comments : [],
    mainPosts_1001CommentByComments:[{}],  
    postInserting : false,

    imageFileName : [], 
    imageUploading: false, 
    imageSrc         : [],
    likeIsClicked :null, 
    clickCommentId:null, 
    commentByCommentCount:0,             //대댓글 입력 후 대댓글 숫자 변경 
    commentByCommentInsertCommentId:null,//어떤 댓글에 대댓글을 달았는지 알기 위한 flag 값

    postDeleting : false,
    postDeleteMessage:'',

    tags:[], //게시물 태그 


}

//게시물 list
export const MAINPOSTS_1001_LIST_REQUEST='MAINPOSTS_1001_LIST_REQUEST';
export const MAINPOSTS_1001_LIST_SUCCESS='MAINPOSTS_1001_LIST_SUCCESS';
export const MAINPOSTS_1001_LIST_FAILURE='MAINPOSTS_1001_LIST_FAILURE';

//게시물 상세 
export const MAINPOSTS_1001_DETAIL_INFO_REQUEST ='MAINPOSTS_1001_DETAIL_INFO_REQUEST'; 
export const MAINPOSTS_1001_DETAIL_INFO_SUCCESS ='MAINPOSTS_1001_DETAIL_INFO_SUCCESS'; 
export const MAINPOSTS_1001_DETAIL_INFO_FAILURE ='MAINPOSTS_1001_DETAIL_INFO_FAILURE'; 

//게시물 댓글 list 
export const MAINPOSTS_1001_COMMENTS_REQUEST = 'MAINPOSTS_1001_COMMENTS_REQUEST';
export const MAINPOSTS_1001_COMMENTS_SUCCESS = 'MAINPOSTS_1001_COMMENTS_SUCCESS';
export const MAINPOSTS_1001_COMMENTS_FAILURE = 'MAINPOSTS_1001_COMMENTS_FAILURE'; 

//게시물 대댓글 list 
export const MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST ='MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST'; 
export const MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS ='MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS'; 
export const MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE ='MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE'; 

//게시물 댓글 insert 
export const MAINPOSTS_1001_COMMENTINSERT_REQUEST = 'MAINPOSTS_1001_COMMENTINSERT_REQUEST';
export const MAINPOSTS_1001_COMMENTINSERT_SUCCESS = 'MAINPOSTS_1001_COMMENTINSERT_SUCCESS';
export const MAINPOSTS_1001_COMMENTINSERT_FAILURE = 'MAINPOSTS_1001_COMMENTINSERT_FAILURE'; 

//게시물 대댓글 insert 
export const MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST = 'MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST';
export const MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS = 'MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS';
export const MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE = 'MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE'; 

//게시글 like / dislike
export const MAINPOSTS_1001_MAINPOSTLIKE_REQUEST = 'MAINPOSTS_1001_MAINPOSTLIKE_REQUEST';
export const MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS = 'MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS';
export const MAINPOSTS_1001_MAINPOSTLIKE_FAILURE = 'MAINPOSTS_1001_MAINPOSTLIKE_FAILURE'; 

//게시글 댓글 like / dislike 
export const MAINPOSTS_1001_COMMENTLIKE_REQUEST = 'MAINPOSTS_1001_COMMENTLIKE_REQUEST';
export const MAINPOSTS_1001_COMMENTLIKE_SUCCESS = 'MAINPOSTS_1001_COMMENTLIKE_SUCCESS';
export const MAINPOSTS_1001_COMMENTLIKE_FAILURE = 'MAINPOSTS_1001_COMMENTLIKE_FAILURE'; 

//게시글 대댓글 like / dislike 
export const MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST = 'MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST';
export const MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS = 'MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS';
export const MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE = 'MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE'; 

//게시글 입력
export const MAINPOST_1001_INSERT_REQUEST = 'MAINPOST_1001_INSERT_REQUEST'; 
export const MAINPOST_1001_INSERT_SUCCESS = 'MAINPOST_1001_INSERT_SUCCESS'; 
export const MAINPOST_1001_INSERT_FAILURE = 'MAINPOST_1001_INSERT_FAILURE'; 

//이미지 업로드 
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

//이미지 이름 가져오기 
export const MAINPOST_1001_IMAGES_REQUEST = 'MAINPOST_1001_IMAGES_REQUEST';
export const MAINPOST_1001_IMAGES_SUCCESS = 'MAINPOST_1001_IMAGES_SUCCESS';
export const MAINPOST_1001_IMAGES_FAILURE = 'MAINPOST_1001_IMAGES_FAILURE';

//이미지 제거하기(게시글 업로드 시) 
export const MAINPOST_1001_IMAGENAME_REMOVE_REQUEST = 'MAINPOST_1001_IMAGENAME_REMOVE_REQUEST';
export const MAINPOST_1001_IMAGENAME_REMOVE_SUCCESS = 'MAINPOST_1001_IMAGENAME_REMOVE_SUCCESS';
export const MAINPOST_1001_IMAGENAME_REMOVE_FAILURE = 'MAINPOST_1001_IMAGENAME_REMOVE_FAILURE';

//이미지 제거하기(게시글 수정 시) 
export const MAINPOST_1001_IMAGE_REMOVE_REQUEST = 'MAINPOST_1001_IMAGE_REMOVE_REQUEST';
export const MAINPOST_1001_IMAGE_REMOVE_SUCCESS = 'MAINPOST_1001_IMAGE_REMOVE_SUCCESS';
export const MAINPOST_1001_IMAGE_REMOVE_FAILURE = 'MAINPOST_1001_IMAGE_REMOVE_FAILURE';

//nav backgroundColor 유지
export const POST_CLICKED_REQUEST = 'POST_CLICKED_REQUEST';

//게시글 삭제 
export const MAINPOSTS_REMOVE_REQUEST='MAINPOSTS_REMOVE_REQUEST';
export const MAINPOSTS_REMOVE_SUCCESS='MAINPOSTS_REMOVE_SUCCESS';
export const MAINPOSTS_REMOVE_FAILURE='MAINPOSTS_REMOVE_FAILURE';

//게시글 수정
export const MAINPOSTS_UPDATE_REQUEST='MAINPOSTS_UPDATE_REQUEST';
export const MAINPOSTS_UPDATE_SUCCESS='MAINPOSTS_UPDATE_SUCCESS';
export const MAINPOSTS_UPDATE_FAILURE='MAINPOSTS_UPDATE_FAILURE';


//태그입력
export const MAINPOSTS_INSERT_TAGS ='MAINPOSTS_INSERT_TAGS'; 

//태그 삭제
export const MAINPOSTS_DELETE_TAGS ='MAINPOSTS_DELETE_TAGS'; 



export const TEST_REQUEST = 'TEST_REQUEST'; 
export const TEST_SUCCESS = 'TEST_SUCCESS'; 
export const TEST_FAILURE = 'TEST_FAILURE'; 



const reducer = (state = initialState, action) => immerProduce(state, (draft) => {

        switch(action.type){

//게시글 리스트 가져오기       
//----------------------------------------
            case MAINPOSTS_1001_LIST_REQUEST: {
                draft.posf=action.data.postFlag;
                break; 
            }

            case MAINPOSTS_1001_LIST_SUCCESS: {
                draft.mainPosts_1001.length=0; 
                //배열 초기화
                action.data.dataArray.forEach((v)=>{
                    draft.mainPosts_1001.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_LIST_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 댓글 INSERT   
//----------------------------------------
            case MAINPOSTS_1001_COMMENTINSERT_REQUEST: {
                draft.isWriting = true;
                break; 
            }

            case MAINPOSTS_1001_COMMENTINSERT_SUCCESS: {
                draft.isWriting = false; 
                draft.mainPosts_1001Comments.length=0; 
                action.data.forEach((v,i)=>{
                    draft.mainPosts_1001Comments.push(v); 
                }); 
                
                break; 
            }

            case MAINPOSTS_1001_COMMENTINSERT_FAILURE: {
                break; 
            }
//----------------------------------------

//게시글 대댓글 INSERT   
//----------------------------------------
            case MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_SUCCESS: {
                draft.mainPosts_1001CommentByComments.length=0; 
                draft.commentByCommentCount = action.data.array.length;
                draft.commentByCommentInsertCommentId=action.data.param.commentId;
                action.data.array.forEach((v)=>{
                    draft.mainPosts_1001CommentByComments.push(v); 
                }); 

                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_FAILURE: {
                break; 
            }
//----------------------------------------



//게시글 상세 페이지 가져오기 
//----------------------------------------
            case MAINPOSTS_1001_DETAIL_INFO_REQUEST: {
                draft.tags.length=0; 
                break; 
            }

            case MAINPOSTS_1001_DETAIL_INFO_SUCCESS: {

                draft.mainPosts_1001Info.length=0; 
                let tagExists = action.data[0].tags.length; 
                if(tagExists!==0){
                    draft.tags = action.data[0].tags.split(','); 
                }
                
                //배열 초기화
                action.data.forEach((v)=>{
                    draft.mainPosts_1001Info.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_DETAIL_INFO_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 댓글 가져오기  
//----------------------------------------
            case MAINPOSTS_1001_COMMENTS_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTS_SUCCESS: {              
                draft.mainPosts_1001Comments.length=0; 
                action.data.forEach((v)=>{
                    draft.mainPosts_1001Comments.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_COMMENTS_FAILURE: {
                break; 
            }
//----------------------------------------



//게시글 대댓글 가져오기 clickCommentId
//----------------------------------------
            case MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENT_SUCCESS: {              
                draft.mainPosts_1001CommentByComments.length=0; 
                draft.clickCommentId=action.data.param.commentId
                action.data.array.forEach((v)=>{
                    draft.mainPosts_1001CommentByComments.push(v); 
                }); 
                
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENT_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 like / dislike       
//----------------------------------------
            case MAINPOSTS_1001_MAINPOSTLIKE_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_MAINPOSTLIKE_SUCCESS: {
                draft.mainPosts_1001Info.length = 0; 
                action.data.array.forEach((v)=>{
                    draft.mainPosts_1001Info.push(v); 
                })
                break; 
            }

            case MAINPOSTS_1001_MAINPOSTLIKE_FAILURE: {
                break; 
            }
//----------------------------------------



//게시글 댓글 like / dislike       
//----------------------------------------
            case MAINPOSTS_1001_COMMENTLIKE_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTLIKE_SUCCESS: {
                draft.mainPosts_1001Comments.length=0; 
                action.data.forEach((v)=>{
                    draft.mainPosts_1001Comments.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_COMMENTLIKE_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 대댓글 like / dislike       
//----------------------------------------
            case MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST: {
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_SUCCESS: {
                draft.mainPosts_1001CommentByComments.length =0;
                action.data.forEach((v)=>{
                    draft.mainPosts_1001CommentByComments.push(v); 
                }); 
                break; 
            }

            case MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_FAILURE: {
                break; 
            }
//----------------------------------------

//게시글 작성 
//----------------------------------------
            case MAINPOST_1001_INSERT_REQUEST: {
                draft.postInserting = true; 
                break; 
            }


            case MAINPOST_1001_INSERT_SUCCESS: {
                draft.postInserting = false; 
                draft.imageFileName = [];  
                break; 
            }

            case MAINPOST_1001_INSERT_FAILURE: {
                break; 
            }
//----------------------------------------


//이미지 업로드       
//----------------------------------------
            case UPLOAD_IMAGES_REQUEST: {
                draft.imageUploading=true;
                break; 
            }

            case UPLOAD_IMAGES_SUCCESS: {
                draft.imageUploading=false;

                //게시글 수정 화면에서 이미지를 업로드 했을 경우 
                if(action.data.updateflag==='update'){
                    const jsonArray = new Array();
                    action.data.filnameArray.map((v)=>{
                        let jsonObj = new Object(); 
                        jsonObj.src = v;
                        jsonObj.update='Y';
                        jsonObj = JSON.stringify(jsonObj); 
                        jsonArray.push(JSON.parse(jsonObj)); 
                    });  
                    draft.imageSrc = draft.imageSrc.concat(jsonArray); 

                //게시글 작성 화면에서 이미지를 업로드 했을 경우 
                }else{
                    draft.imageFileName=draft.imageFileName.concat(action.data.filnameArray); 

                }
                break; 
            }

            case UPLOAD_IMAGES_FAILURE: {
                break; 
            }
//----------------------------------------


//이미지 이름 가져오기
//----------------------------------------
            case MAINPOST_1001_IMAGES_REQUEST: {
                
                break; 
            }

            case MAINPOST_1001_IMAGES_SUCCESS: {
                draft.imageSrc.length = 0; 
                draft.imageSrc=draft.imageSrc.concat(action.data); 
                break; 
            }

            case MAINPOST_1001_IMAGES_FAILURE: {
                break; 
            }
//----------------------------------------


//이미지 제거하기(게시글 업로드 시) 
//----------------------------------------
            case MAINPOST_1001_IMAGENAME_REMOVE_REQUEST: {    
                draft.imageFileName = draft.imageFileName.filter((v, i) => v !== action.data.removeImageName);
                break; 
            }
//----------------------------------------


//이미지 제거하기(게시글 수정 시) 
//----------------------------------------
        case MAINPOST_1001_IMAGE_REMOVE_REQUEST: { 
                draft.imageSrc = draft.imageSrc.filter((v, i) => v.src !== action.data.removeImageName);
                break; 
        }
//----------------------------------------

//nav backgroundColor 유지
//----------------------------------------
            case POST_CLICKED_REQUEST: {
                draft.posf=action.data.postFlag;
                break; 
            }
//----------------------------------------



//게시글 삭제
//----------------------------------------
            case MAINPOSTS_REMOVE_REQUEST: {
                draft.postDeleting=true;           
                break; 
            }

            case MAINPOSTS_REMOVE_SUCCESS: {
                draft.postDeleting=false;   
                draft.postDeleteMessage =action.data.message;
                break; 
            }

            case MAINPOSTS_REMOVE_FAILURE: {
                break; 
            }
//----------------------------------------


//게시글 수정
//----------------------------------------
            case MAINPOSTS_UPDATE_REQUEST: {
                break; 
            }

            case MAINPOSTS_UPDATE_SUCCESS: {
  
                break; 
            }

            case MAINPOSTS_UPDATE_FAILURE: {
                break; 
            }
//----------------------------------------


//태그 입력, 태그 삭제
//----------------------------------------
            case MAINPOSTS_INSERT_TAGS: {
                let tag = action.data.tagsValue; 
                draft.tags.push(tag); 

                break; 
            }

            case MAINPOSTS_DELETE_TAGS: {
                let tag = action.data.tagsValue.replace(',',''); 
                draft.tags = draft.tags.filter((v, i) => v !== tag);
                break; 
            }
//----------------------------------------






            default : break; 
        }
    });

 export default reducer;