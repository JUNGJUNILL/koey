import { useState, useCallback, useRef} from 'react';
import { backImageUrl,AWSImageUrl,backUrl } from '../../config/config';
import secureFilter from   '../../util/secureFilter';
import { useRouter } from 'next/router'


import {Editor} from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css';
import 
    {
        MAINPOST_1001_IMAGENAME_REMOVE_REQUEST,
        UPLOAD_IMAGES_REQUEST,
        MAINPOST_1001_INSERT_REQUEST,
        MAINPOSTS_UPDATE_REQUEST
    } 
from '../../reducers/mainPosts_1001';
import ImageUploadComponentToastUI from './ImageUploadComponentToastUI'; 
import ToastUIInsertHTML from './ToastUIInsertHTML'; 
import {Button, Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux';


const ToastEditor =({posf,postId,userId,submitDay,imageExist,updateFlag})=>{


    const dispatch = useDispatch(); 
    const editorRef = useRef();
    const refTitle = useRef();
    const imageInputToastUI = useRef();
    const router = useRouter();
    const blank_pattern = /^\s+|\s+&/g; 


    const {userInfo,userid} = useSelector((state)=>state.auth); 
    const {imageUploading,imageFileName,postInserting, mainPosts_1001Info,imageSrc} = useSelector((state)=>state.mainPosts_1001); 
    const [preview,setPreview] = useState(false);
    const [title,setTtile] = useState(updateFlag==='update'? mainPosts_1001Info[0].title:''); 

    //제목 입력
    const onChangeTtitle  = useCallback((e)=>{
        setTtile(e.target.value); 
    },[title])


    //미리보기 체크 
    const checkPreviewOption =useCallback(()=>{
        preview ? setPreview(false) : setPreview(true); 

    },[preview])


    //게시물 작성인지, 수정인지 flag 값
    const [imgClick , setImgClick] =useState(false); 


    //ToastUI에 커스텀 툴바 눌렀을 때 발생하는 이벤트
    const createLastButton = () =>{
        const button =  document.createElement('button');


        button.className = 'toastui-editor-toolbar-icons last';
        button.style.backgroundImage = 'none';
        button.style.margin = '0';
        button.innerHTML = '<b>사진</b>';

        //클릭 시!
         button.addEventListener('click', () => {

            //게시글 수정 상태에서 이미지 추가를 위해 클릭 했을 경우
            //게시글을 수정하기 위해 수정 버튼을 누르고 거기서 게시글의 이미지를 추가 할 경우를 고려
            updateFlag==='update'?setImgClick(true) : setImgClick(false); 
            
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

        if(imageArray.length > 5){
            alert('한번에 6장 이상 올릴 수 없습니다.'); 
            //setImageCount([]);
            imageFormData.delete('image'); 
            return; 
        }else{
           
            const updateflag = updateFlag?updateFlag:'';
            console.log('updateflag=>', updateflag); 
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
    
    
    },[imageFileName]);
    


        //본문에 이미지 삽입
        const insertImage =(v)=>{
            let imageUrl =process.env.NODE_ENV==='production' 
                            ?`${AWSImageUrl}/images/${posf}/${v}}` //실서버
                            :`${backImageUrl}/${posf}/${v}`       //로컬 
            let  imgHTML=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
            const html = editorRef.current.getInstance().getHTML();
            editorRef.current.getInstance().setHTML(html.concat(imgHTML));          

        }



    //submit
        const contentSummit = ()=>{
            if(title.length === 0 || title.replace(blank_pattern,'')===""){
                refTitle.current.focus();  
                alert('제목을 입력 해 주세요'); 
                return; 
            }

        

            const filteredContent = editorRef.current.getInstance().getHTML(); 
            const filteredTitle   = secureFilter(title); 
            const hello = filteredContent.replace(/(?:\r\n|\r|\n)/g, '<br />');

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
                    data: {content:encodeURIComponent(filteredContent),
                        title:encodeURIComponent(filteredTitle),
                        userNickName:encodeURIComponent(userInfo), 
                        imageFileName: imageFileName, 
                        postFlag:posf,
                        userid:encodeURIComponent(userid),
                        preview:previewCheck,
                        postCategory : 'blog'
                        
                },
        
            }); 

            router.replace(`/posts/mainPosts_1001?nowPage=1&posf=${posf}`); 
            
            }

        }

    

    return(
            <>
            {/*이미지 업로드 하면 본문에 바로 추가 해주는 로직이 들어간 컴포넌트 */}
             <ToastUIInsertHTML postFlag={posf} imageFileName={imageFileName} imageSrc={imageSrc} imgClick={imgClick} ref={editorRef} updateFlag={updateFlag}/>           
            {/*업로드 버튼 눌렀을 때*/}
            <input type="file" name="image" multiple hidden ref={imageInputToastUI} accept={'.jpg,.gif,.png,.bmp,.jpeg,.webp'} onChange={onChangeImagesToastUI}/>
        
               
            <Input placeholder='제목을 입력하세요' ref={refTitle} value={title} onChange={onChangeTtitle} style={{marginBottom:'2%',marginTop:'2%'}}/>
            <Editor 
            ref={editorRef}
            
            initialValue={updateFlag==='update'?mainPosts_1001Info[0].content:''}
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            placeholder='하고 싶은 이야기'
            toolbarItems={[
                // 툴바 옵션 설정
                ['heading', 'bold', 'italic', 'strike'],
               // ['image', 'link'],
                
               //커스텀 툴바
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

            <ImageUploadComponentToastUI postFlag={posf} updateFlag={updateFlag} imageFileName={imageFileName} removeImage={removeImage} removeImageName={removeImageName} checkPreviewOption={checkPreviewOption} insertImage={insertImage} preview={preview} />
            <div style={{marginTop:'2%',textAlign:'center'}}>
                <Button type="primary" onClick={contentSummit} loading={imageUploading | postInserting}>  submit  </Button>
            </div>


          

            </>
            
    )
}

export default ToastEditor; 