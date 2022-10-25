import { useState, useCallback, useRef, useEffect } from 'react';

import {Editor} from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css';

const ToastEditor =()=>{


    const editorRef = useRef();
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
         button.addEventListener('click', () => {
            console.log('안녕하세요!');
          });

          return button; 
    }
    
        const image ='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg'; 
        const imagew ='https://jscompany-s3.s3.ap-northeast-2.amazonaws.com/images/1001/z5_1666611928876_%EB%B3%91%EC%9E%BCTV.webp';
        
        //이미지 본분에 삽입
        const handleClick =()=>{
            const html = editorRef.current.getInstance().getHTML();
            editorRef.current.getInstance().setHTML(html.concat(`<img src=${image}>`));
        }
        //고양이 사진
        //
    return(
            <>
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
            <input type="button" value='버튼' onClick={showData} />
            <button onClick={handleClick}>make bold</button>

            {content && 
                  <div style={{padding:'3%'}} dangerouslySetInnerHTML={{__html:content}} />
                  
            }
          

            </>
            
    )
}

export default ToastEditor; 