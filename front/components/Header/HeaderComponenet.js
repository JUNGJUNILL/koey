
import jsMetaImage from '../../public/jsMetaImage.gif';
import { backImageUrl,AWSImageUrl } from '../../config/config';
import Head from "next/head";
import wrapper from '../../store/configureStore';
import { Helmet } from "react-helmet"

import {END} from 'redux-saga'; 


const HeaderComponenet =({posf,title,image,contents})=>{

    
    let rootUrl = process.env.NODE_ENV==='production' 
                    ? `${AWSImageUrl}/images/${posf}/`
                    : `${backImageUrl}/${posf}/`;

    if(image.length>0){
        rootUrl+=image;
    }else{
        rootUrl='https://www.hubpass.co.kr/external/images/a1001/jsMetaImage.gif';
    }

    return(
        <div>              
            <Helmet title={title} 
                    meta={[

                        { property:"og:url", content:"http://www.jscompany.live"},
                        { property:"og:title", content:'안녕하세요'},
                        { property: "og:description", content:'감사합니다.' },
                        { property: "og:image", content:'https://www.hubpass.co.kr/external/images/a1001/jsMetaImage.gif' },  
                    ]}/>      
        </div>
    )

}

export default HeaderComponenet;