import { useState, useCallback, useRef, useEffect } from 'react';
import { backImageUrl,AWSImageUrl,backUrl } from '../../config/config';


import {Editor} from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css';

import 
    {
        MAINPOST_1001_IMAGENAME_REMOVE_REQUEST,
        UPLOAD_IMAGES_REQUEST
    } 
from '../../reducers/mainPosts_1001';
import ImageUploadComponentToastUI from './ImageUploadComponentToastUI'; 


import { ConsoleSqlOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';


const ToastEditor =({posf,postId,userId,submitDay,imageExist,updateFlag})=>{


    const dispatch = useDispatch(); 
    const editorRef = useRef();
    const imageInputToastUI = useRef();

    const {userInfo,userid} = useSelector((state)=>state.auth); 
    const {imageUploading,imageFileName,postInserting, mainPosts_1001Info,imageSrc} = useSelector((state)=>state.mainPosts_1001); 
    const [preview,setPreview] = useState(false); 



    const[content, setContent]=useState('락토핏'); 

    const showData = () =>{
        const html = editorRef.current.getInstance().getHTML();
        
        
        const markDown = editorRef.current.getInstance().getMarkdown();
        

        console.log('html=>', html,' type of=>',typeof html) ;
        setContent(html); 

        console.log('markDown=>', markDown);
    }

   

    const createLastButton = () =>{
        const button =  document.createElement('button');


        button.className = 'toastui-editor-toolbar-icons last';
        button.style.backgroundImage = 'none';
        button.style.margin = '0';
        button.innerHTML = '사진';

        //클릭 시!
         button.addEventListener('click', () => {
            imageInputToastUI.current.click(); 
          });

          return button; 
    }


    //이미지 제거(게시글 수정 시)
    const removeImage = () =>{

    }

    //이미지 제거(게시글 입력 시)
    const removeImageName =(v) =>{

        if(window.confirm('정말로 삭제하시겠습니까?')){
            dispatch({type:MAINPOST_1001_IMAGENAME_REMOVE_REQUEST,
                data:{removeImageName:v,},
          }); 
          alert('사진이 삭제되었습니다.');
        }else{
            return;
        }

    }

    //미리보기 체크
    const checkPreviewOption =useCallback(()=>{
        preview ? setPreview(false) : setPreview(true); 

    },[preview])


    //이미지 선택 후 열기 눌렀을 때
    const onChangeImagesToastUI =useCallback((e)=>{

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



        //한번에 5장 이상 올렸을 경우 
        const imageArray = imageFormData.getAll('image');
        console.log(imageArray); 
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

            

        });                 
       


        }catch(e){
            alert(e);
        }
    
    
    },[]);
    
        const image ='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg'; 
        const imagew ='https://jscompany-s3.s3.ap-northeast-2.amazonaws.com/images/1001/z5_1666611928876_%EB%B3%91%EC%9E%BCTV.webp';
        
        //이미지 본분에 삽입
        const handleClick =()=>{
            const html = editorRef.current.getInstance().getHTML();
            editorRef.current.getInstance().setHTML(html.concat(`<img src=${image}>`));
        }

        
        const func =() =>{
            const imagefilename = imageFileName;
            let imageUrl =''; 
            let imgHTML  =''; 


            console.log('imageFileName length=>',imageFileName.length); 
            imagefilename.map((v,i)=>{
    
                imageUrl+=process.env.NODE_ENV==='production' 
                          ?`${AWSImageUrl}/images/${posf}/${v}}` //실서버
                          :`${backImageUrl}/${posf}/${v}`       //로컬 
                
                imgHTML+=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
                imageUrl=''; 
    
            }); 

            if(imageFileName.length>0){    
                const html = editorRef.current.getInstance().getHTML();
                editorRef.current.getInstance().setHTML(html.concat(imgHTML));          
            }

         
        }

        const insertImage =(v)=>{
            let imageUrl =process.env.NODE_ENV==='production' 
                            ?`${AWSImageUrl}/images/${posf}/${v}}` //실서버
                            :`${backImageUrl}/${posf}/${v}`       //로컬 
            let  imgHTML=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
            const html = editorRef.current.getInstance().getHTML();
            editorRef.current.getInstance().setHTML(html.concat(imgHTML));          

            console.log(imgHTML); 
        }

    return(
            <>
            {imageFileName && func()}
            <input type="file" name="image" multiple hidden ref={imageInputToastUI} accept={'.jpg,.gif,.png,.bmp,.jpeg,.webp'} onChange={onChangeImagesToastUI}/>

            <Editor 
            ref={editorRef}
            
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}

            toolbarItems={[
                // 툴바 옵션 설정
                ['heading', 'bold', 'italic', 'strike'],
                ['image', 'link'],
         
                [

                    {

                    name: 'myItem',
                    tooltip: 'image',
                     el:createLastButton(), 
                    text:'사진',
                    }
                ]
              ]}
              

            />

            <br/>

            <ImageUploadComponentToastUI postFlag={posf} updateFlag={updateFlag} imageFileName={imageFileName} removeImage={removeImage} removeImageName={removeImageName} checkPreviewOption={checkPreviewOption} insertImage={insertImage} preview={preview}/>


            <input type="button" value='버튼' onClick={showData} />
            <button onClick={handleClick}>make bold</button>

            {content && 
                  <div style={{padding:'3%'}} dangerouslySetInnerHTML={{__html:content}} />
                  
            }
          

            </>
            
    )
}

export default ToastEditor; 