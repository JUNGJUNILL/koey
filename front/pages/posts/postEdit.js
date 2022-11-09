import { useState, useCallback, useRef, useEffect, createRef } from 'react';
import { useRouter } from 'next/router'
import wrapper from '../../store/configureStore';
import {PictureOutlined,PlaySquareOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import {END} from 'redux-saga'; 
import axios from  'axios'; 
import {Button, Input,} from 'antd'
import { backImageUrl,AWSImageUrl,backUrl } from '../../config/config';
import secureFilter from   '../../util/secureFilter';
import ImageUploadComponent from '../../components/mainPosts_1001/ImageUploadComponent';
import TagsComponent from '../../components/mainPosts_1001/TagsComponent';

import 
    {
        UPLOAD_IMAGES_REQUEST
    } 
from '../../reducers/mainPosts_1001';
import 
    {
        LOAD_USER_REQUEST,
    } 
from '../../reducers/auth'; 
import 
    {
        MAINPOST_1001_INSERT_REQUEST,
        MAINPOST_1001_IMAGENAME_REMOVE_REQUEST,
        POST_CLICKED_REQUEST,
        MAINPOSTS_UPDATE_REQUEST,
        MAINPOSTS_1001_DETAIL_INFO_REQUEST,
        MAINPOST_1001_IMAGES_REQUEST,
        MAINPOST_1001_IMAGE_REMOVE_REQUEST
    } 
from '../../reducers/mainPosts_1001';


const { TextArea } = Input;





const postEdit = ({posf,postId,userId,submitDay,imageExist,updateFlag}) =>{


    const dispatch = useDispatch(); 
    const {imageUploading,imageFileName,postInserting, mainPosts_1001Info,imageSrc,tags} = useSelector((state)=>state.mainPosts_1001); 
    const {userInfo,userid} = useSelector((state)=>state.auth); 
    const refTitle = useRef(); 
    const refContent = useRef(); 
    const imageInput = useRef();
    const videoInput = useRef(); 
    const router = useRouter();
    const blank_pattern = /^\s+|\s+&/g; 
    const [title,setTtile] = useState(updateFlag==='update'? mainPosts_1001Info[0].title:''); 
    const [content,setContent] = useState(updateFlag==='update'? mainPosts_1001Info[0].content:'');
    const [imageCount,setImageCount]= useState([]); 
    const [preview,setPreview] = useState(false); 
  
    useEffect(()=>{
        if(!posf){
            return null;
        }

        
        if(updateFlag && updateFlag==='update'){
                dispatch({
                    type:MAINPOSTS_1001_DETAIL_INFO_REQUEST, 
                    data:{
                        postId:postId,
                        pid:encodeURIComponent(userId),     
                        postFlag:posf,
                        who:'',
                        submitDay:submitDay,
                    }
                });

                if(imageExist>0){
                    dispatch({
                        type:MAINPOST_1001_IMAGES_REQUEST, 
                        data:{
                          postId:postId,
                          pid:encodeURIComponent(userId),
                          submitDay:submitDay,
                          postFlag:posf,}
                      });
                }          
        }


        
        //로그인 만료 시 로그인 창으로 이동 
        if(!userInfo){
            router.push('/auth/login'); 
        }

        
       
    },[!userInfo,posf])


    //제목 입력
    const onChangeTtitle  = useCallback((e)=>{
        setTtile(e.target.value); 
    },[title])

    //게시글 입력
    const onChangeContent  = useCallback((e)=>{
        setContent(e.target.value); 
    },[content])

    //submit
    const contentSummit = ()=>{
        if(title.length === 0 || title.replace(blank_pattern,'')===""){
            refTitle.current.focus();  
            alert('제목을 입력 해 주세요'); 
            return; 
        }

        if(content.length === 0 || content.replace(blank_pattern,'')===""){
            refContent.current.focus();
            alert('게시글을 작성해 주세요'); 
            return; 
        }

        const filteredContent = secureFilter(content); 
        const filteredTitle   = secureFilter(title); 
        const hello = filteredContent.replace(/(?:\r\n|\r|\n)/g, '<br />');
        let tagString =''; 
        if(tags.length>0){
            tags.map((v,i)=>{
                if(tags.length-1==i){
                    tagString+=v; 
                }else{
                    tagString+=v+','; 
                }
              
            });
        }
        
        //게시글 UPDATE
        if(updateFlag && updateFlag==='update'){
            dispatch({
                type: MAINPOSTS_UPDATE_REQUEST,
                data: {postFlag:posf,
                       postId:postId,
                       userId:encodeURIComponent(userid),
                       submitDay:submitDay,
                       title:encodeURIComponent(filteredTitle),
                       content:encodeURIComponent(hello),
                       imageSrc:imageSrc,
                       tags:encodeURIComponent(tagString),

                       
               },
    
           }); 

           


           router.replace({pathname:'/posts/[detailPage]',
           query:{detailPage:'detailPage', 
                  postId:postId,
                  postFlag:posf,
                  submitDay:submitDay,
                  pid:userId,
                  userNickName:'',                     
                  who:'',
           },}); 


        //게시글 INSERT
        }else{
            const previewCheck =preview?'Y':'N';  



            dispatch({
                type: MAINPOST_1001_INSERT_REQUEST,
                data: {content:encodeURIComponent(hello),
                       title:encodeURIComponent(filteredTitle),
                       userNickName:encodeURIComponent(userInfo), 
                       imageFileName: imageFileName, 
                       postFlag:posf,
                       userid:encodeURIComponent(userid),
                       preview:previewCheck,
                       tags:encodeURIComponent(tagString),
                       postCategory : 'common'
                       
               },
    
           }); 

           router.replace(`/posts/mainPosts_1001?nowPage=1&posf=${posf}`); 
        }

    }


    //이미지 업로드 클릭 
    const onClickImageUpload = useCallback(() =>{
        
        if(imageFileName.length>=10){
            alert(`게시물당 이미지는 ${imageFileName.length}장 올릴 수 있습니다.`); 
            return; 
        }

        imageInput.current.click(); 
        
    },[imageInput.current,imageFileName]); 

    //비디오 업로드 클릭 
    const onClickVideoUpload = useCallback(() =>{
        videoInput.current.click(); 

    },[videoInput.current]); 

    //이미지 업로드 
    const onChangeImages = useCallback((e)=>{
        
        //파일을 2개 올렸을 시 e.target.files의 생김새
        //{0:File, 1:File, length:2} 유사 배열 형태

        //File의 생김새
        //name , size, type, lastModified, lastModifiedDate 속성을 가져올 수 있다.
        //typeof e.target.files  == object 
        //유사 배열이므로 [].forEach.call을 사용한다. 
        try{


        const imageFormData = new FormData(); 
        Array.prototype.forEach.call(e.target.files,(f,i)=>{

            const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
            let fileName=Object.values(e.target.files)[i].name; 
            let fileNamelength=fileName.length; 
            let lastDot=fileName.lastIndexOf(".");
            let fileExt=fileName.substring(lastDot,fileNamelength).toLowerCase(); 

            if(special_pattern.test(fileName)){
                alert("파일명에 특수문자가 있을 경우 업로드 할 수 없습니다."); 
                return; 
            }

            if(lastDot === -1){
                alert("파일 확장자가 없는 파일은 업로드 할 수 없습니다."); 
                return; 
            }

            switch(fileExt){
                case ".jpg" : break;
                case ".gif" : break;
                case ".png" : break;
                case ".bmp" : break;
                case ".jpeg" : break;
                case ".webp" : break;
                default : alert("지원되지 않는 파일 확장자입니다.\n (.jpg, .gif, .png, .bmp, .jpeg, .webp 만 가능)"); return;
            }

            //10485760 BYTE == 10MB
            if(Object.values(e.target.files)[i].size > 10485760){
                alert('10MB 이상 올릴 수 없습니다.');
                return; 
            }else{
                imageFormData.append('image',f); 
            }

        }); 
        const imageArray = imageFormData.getAll('image');
        //setImageCount(imageCount.concat(imageArray));

        //한번에 5장 이상 올렸을 경우 
        if(imageArray.length > 5){
            alert('한번에 6장 이상 올릴 수 없습니다.'); 
            //setImageCount([]);
            imageFormData.delete('image'); 
            return; 
        }else{
           
            const updateflag = updateFlag?updateFlag:'';

            dispatch({type:UPLOAD_IMAGES_REQUEST,
                data:{images:imageFormData,
                     postFlag:posf,
                     isUpdate:updateflag,
                     user:encodeURIComponent(userInfo),

                    },
                }); 
    
        }


    }catch(e){
        alert(e);
    }
    //imageCount
    },[]); 


    //이미지 제거(게시글 수정 시)
    const removeImage =(v,posf,imageId,postId,userId,submitDay,update) => {
        try{
            if(window.confirm('정말로 삭제하시겠습니까?')){
                dispatch({type:MAINPOST_1001_IMAGE_REMOVE_REQUEST,
                    data:{removeImageName:v,
                        posf,
                        imageId,
                        postId,
                        userId,
                        submitDay,
                        update
                    },
            }); 
            alert('사진이 삭제되었습니다.');
            }else{
                return;
            }

        }catch(e){
            alert(e);
        }

    }

    //이미지 제거(게시글 입력 시)
    const removeImageName=(v)=>{
        if(window.confirm('정말로 삭제하시겠습니까?')){
            dispatch({type:MAINPOST_1001_IMAGENAME_REMOVE_REQUEST,
                data:{removeImageName:v,},
          }); 
          alert('사진이 삭제되었습니다.');
        }else{
            return;
        }
    }

    const checkPreviewOption =useCallback(()=>{
        preview ? setPreview(false) : setPreview(true); 

    },[preview])

    return (
        
        <div style={{marginTop:'3%'}}>
            {/*이미지 업로드 */}
            <input type="file" name="image" multiple hidden ref={imageInput} accept={'.jpg,.gif,.png,.bmp,.jpeg,.webp'} onChange={onChangeImages}/>
            {/*비디오 업로드
            <input type="file" name="video" multiple hidden ref={videoInput} accept={'.mp4'} onChange={onClickVideoUpload}/>
             */}
        <Input placeholder='제목을 입력하세요' ref={refTitle} value={title} onChange={onChangeTtitle} style={{marginBottom:'2%'}}/>
        <TextArea placeholder='하고 싶은 이야기' ref={refContent} value={content.replaceAll('<br />','\n')} onChange={onChangeContent} rows={10} />
        <TagsComponent />
      
       



        <div style={{marginTop:'2%',textAlign:'center'}}>
            <Button onClick={onClickImageUpload} >    <PictureOutlined />    </Button>&nbsp;
            {/* <Button onClick={onClickVideoUpload} >    <PlaySquareOutlined />    </Button>&nbsp; */}
            <Button type="primary" onClick={contentSummit} loading={imageUploading | postInserting}>  submit  </Button>
       </div> 

       <br/>

        <ImageUploadComponent postFlag={posf} updateFlag={updateFlag} imageFileName={imageFileName} removeImage={removeImage} removeImageName={removeImageName} checkPreviewOption={checkPreviewOption} preview={preview}/>
    
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const posf=context.query.posf?context.query.posf:'';
    const postId=context.query.postid?context.query.postid:'';
    const userId=context.query.userid?context.query.userid:'';
    const submitDay=context.query.submitday?context.query.submitday:'';
    const imageExist=context.query.imageexist?parseInt(context.query.imageexist):0;
    const updateFlag=context.query.updateflag?context.query.updateflag:'';

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


export default postEdit; 