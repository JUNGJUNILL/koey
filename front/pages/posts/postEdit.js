import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import wrapper from '../../store/configureStore';
import {PictureOutlined,PlaySquareOutlined,CloseOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import {END} from 'redux-saga'; 
import axios from  'axios'; 
import {Button, Input,} from 'antd'
import { backImageUrl,AWSImageUrl,backUrl } from '../../config/config';
import secureFilter from   '../../util/secureFilter';

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
        POST_CLICKED_REQUEST
    } 
from '../../reducers/mainPosts_1001'; 
const { TextArea } = Input;



const postEdit = () =>{


    const dispatch = useDispatch(); 
    const {imageUploading,imageFileName,postInserting} = useSelector((state)=>state.mainPosts_1001); 
    const {userInfo,userid} = useSelector((state)=>state.auth); 
    const refTitle = useRef(); 
    const refContent = useRef(); 
    const imageInput = useRef();
    const videoInput = useRef(); 
    const router = useRouter();
    const posf = router.query.posf; 

    const blank_pattern = /^\s+|\s+&/g; 
    const [title,setTtile] = useState(''); 
    const [content,setContent] = useState('');
    const [imageCount,setImageCount]= useState([]); 
  
    useEffect(()=>{

        if(!posf){
            return null
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

        let contentImages=""; 
        if(imageFileName.length > 0 ){
            imageFileName.map((v)=>{
                contentImages =contentImages +  `<figure ><img src="${backImageUrl}/${posf}/${v}"></figure>`
            }); 
        }
        const filteredContent = secureFilter(content); 
        const filteredTitle   = secureFilter(title); 
        const hello = filteredContent.replace(/(?:\r\n|\r|\n)/g, '<br />');

        dispatch({
            type: MAINPOST_1001_INSERT_REQUEST,
            data: {content:encodeURIComponent(hello),
                   contentImages :encodeURIComponent(contentImages),
                   title:encodeURIComponent(filteredTitle),
                   userNickName:encodeURIComponent(userInfo), 
                   imageFileName: imageFileName, 
                   postFlag:posf,
                   userid:encodeURIComponent(userid),
                   
           },

       }); 

       router.replace(`/posts/mainPosts_1001?nowPage=1&posf=${posf}`); 
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

        const imageFormData = new FormData(); 
        Array.prototype.forEach.call(e.target.files,(f,i)=>{

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
            alert('한번에 5장 이상 올릴 수 없습니다.'); 
            //setImageCount([]);
            imageFormData.delete('image'); 
            return; 
        }else{
            
            dispatch({type:UPLOAD_IMAGES_REQUEST,
                data:{images:imageFormData,
                     postFlag:posf,
                     user:encodeURIComponent(userInfo),
                    },
                }); 
    
        }

    //imageCount
    },[]); 


    //이미지 제거 
    const removeImage =(v) => {

        dispatch({type:MAINPOST_1001_IMAGENAME_REMOVE_REQUEST,
                  data:{removeImageName:v,},
            }); 
            
    }

    return (
        
        <div style={{marginTop:'3%'}}>
            {/*이미지 업로드 */}
            <input type="file" name="image" multiple hidden ref={imageInput} accept={'.jpg,.gif,.png,.bmp,.jpeg'} onChange={onChangeImages}/>
            {/*비디오 업로드
            <input type="file" name="video" multiple hidden ref={videoInput} accept={'.mp4'} onChange={onClickVideoUpload}/>
             */}
        <Input placeholder='제목을 입력하세요' ref={refTitle} onChange={onChangeTtitle} style={{marginBottom:'2%'}}/>
        <TextArea placeholder='하고 싶은 이야기' ref={refContent} onChange={onChangeContent} rows={4} />
        <div style={{marginTop:'2%',textAlign:'center'}}>
            <Button onClick={onClickImageUpload} >    <PictureOutlined />    </Button>&nbsp;
            <Button onClick={onClickVideoUpload} >    <PlaySquareOutlined />    </Button>&nbsp;
            <Button type="primary" onClick={contentSummit} loading={imageUploading | postInserting}>  submit  </Button>
       </div> 
       <br/>

       <div style={{textAlign:'center'}}>
            {imageFileName && imageFileName.map((v,i)=>(
                <div style={{display:'inline-block'}} key={i} >
                    <img style={{width:'60px',height:'60px'}} src={process.env.NODE_ENV==='production' 
                                                                   ? 
                                                                   
                                                                   //원본 이미지
                                                                   `${AWSImageUrl}/images/${posf}/${v.split('/')[v.split('/').length-1]}`
                                                                   
                                                                   //이미지 리사이즈
                                                                   //`${backUrl}/imgResizing?size=60x60&posf=${posf}&fileName=${AWSImageUrl}/images/${posf}/${v.split('/')[v.split('/').length-1]}` 
                                                                   : 
                                                                   `${backUrl}/imgResizing?size=60x60&posf=${posf}&fileName=${backImageUrl}/${posf}/${v}`} />    
                    <br/>
                    <Button style={{width:'60px'}}><CloseOutlined onClick={()=>removeImage(v)} /></Button>
                </div>
            ))}
        </div>
  
      

        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

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
        data:{postFlag:context.query.posf,}
    });


    

    context.store.dispatch(END); 
    await context.store.sagaTask.toPromise(); 

});


export default postEdit; 