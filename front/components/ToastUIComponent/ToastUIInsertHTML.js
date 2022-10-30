import React, { useEffect, useState, forwardRef} from 'react'
import { backImageUrl,AWSImageUrl } from '../../config/config';



const ToastUIInsertHTML =forwardRef(({postFlag,imageFileName,imageSrc,imgClick,updateFlag},ref)=>{
    const _updateFlag = updateFlag==='update' ? true : false;
    const imgs = _updateFlag ? imageSrc:imageFileName;     
    const [imgLength,setImgLength] = useState(0); 

    //imgClick : false 게시글 작성 시 업로드 시 클릭, true : 게시물 수정 시 업로드 클릭
    useEffect(()=>{
        let imagefilename =[...imgs];
        let imageUrl =''; 
        let imgHTML  =''; 
        let imgArrayLength = _updateFlag ? imagefilename.length-1 : imgLength; 

        imagefilename.map((v,i)=>{
            if(i >= imgArrayLength){
                let imgName=_updateFlag ? v.src : v; 
                
                imageUrl+=process.env.NODE_ENV==='production' 
                ?`${imgName}` //실서버
                :`${backImageUrl}/${postFlag}/${imgName}`       //로컬 

                imgHTML+=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
                imageUrl=''; 
            }
        }); 
        

        if((imgClick && imagefilename.length>0) //업데이트 시 이 부분이 실행되면 안된다.
           || 
            !_updateFlag //인설트 시에는 이 부분이 실행이 되어야 한다. 
          ){    
            const html = ref.current.getInstance().getHTML();
            ref.current.getInstance().setHTML(html.concat(imgHTML));      
        }
        setImgLength(imagefilename.length); 



    },[imgs]);

    return(
        <></>
    )

}); 

export default ToastUIInsertHTML; 

/*
      if(updateFlag!=='update'){

            let imagefilename =[...imgs];
            let imageUrl =''; 
            let imgHTML  ='';   
            imagefilename.map((v,i)=>{
                if(i >= imgLength){ //게시글 작성 시 
    
                    imageUrl+=process.env.NODE_ENV==='production' 
                    ?`${AWSImageUrl}/images/${postFlag}/${v}}` //실서버
                    :`${backImageUrl}/${postFlag}/${v}`       //로컬 
    
                    imgHTML+=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
                    imageUrl=''; 
                }
            }); 
        
            if(imagefilename.length>0){    
                const html = ref.current.getInstance().getHTML();
                ref.current.getInstance().setHTML(html.concat(imgHTML));          
            }
            setImgLength(imagefilename.length); 
        }

        if(updateFlag==='update'){
            
            let imagefilename =[...imgs];
            console.log('imagefilename=> ', imagefilename, 'imagefilename.length=> ',imagefilename.length);
            let imageUrl =''; 
            let imgHTML  ='';   
            imagefilename.map((v,i)=>{
                if(imgClick && (i >= imagefilename.length-1)){ //게시글 수정 시 
    
                    imageUrl+=process.env.NODE_ENV==='production' 
                    ?`${AWSImageUrl}/images/${postFlag}/${v.src}}` //실서버
                    :`${backImageUrl}/${postFlag}/${v.src}`       //로컬 
    
                    imgHTML+=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
                    imageUrl=''; 
                }
            }); 
        
            if(imagefilename.length>0){    
                const html = ref.current.getInstance().getHTML();
                ref.current.getInstance().setHTML(html.concat(imgHTML));          
            }

        }
*/