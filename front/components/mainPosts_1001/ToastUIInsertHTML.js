import React, { useEffect, useState, forwardRef} from 'react'
import { backImageUrl,AWSImageUrl } from '../../config/config';

const ToastUIInsertHTML =forwardRef(({imageFileName},ref)=>{

    const imgs = imageFileName; 
    const [imgLength,setImgLength] = useState(0); 

    useEffect(()=>{

        let imagefilename =[...imgs];
        let imageUrl =''; 
        let imgHTML  ='';   
        imagefilename.map((v,i)=>{
            if(i >= imgLength){

                imageUrl+=process.env.NODE_ENV==='production' 
                ?`${AWSImageUrl}/images/${'1001'}/${v}}` //실서버
                :`${backImageUrl}/${'1001'}/${v}`       //로컬 
      
                imgHTML+=`<p><img src="${imageUrl}" contenteditable="false"><br></p>`
                imageUrl=''; 
            }
        }); 
    
        if(imageFileName.length>0){    
            const html = ref.current.getInstance().getHTML();
            ref.current.getInstance().setHTML(html.concat(imgHTML));          
        }
        setImgLength(imageFileName.length); 

    },[imgs])

    return(
        <></>
    )

}); 

export default ToastUIInsertHTML; 