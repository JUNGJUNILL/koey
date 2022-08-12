
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
            <Helmet meta={[
                { property:"og:url", content:"http://www.jscompany.live"},
                { property:"og:title", content:{title}},
                { property: "og:description", content: {contents} },
                { property: "og:image", content: {rootUrl} },  
            ]}/>      
        </div>
    )

}

export default HeaderComponenet;