
import jsMetaImage from '../../public/jsMetaImage.gif';
import { backImageUrl,AWSImageUrl } from '../../config/config';
import { Helmet } from "react-helmet"
import Head from "next/head";

import { Url } from '../../config/config';


const HeaderComponenet =({posf,title,image,contents,preview,writer})=>{

    
    let rootUrl = process.env.NODE_ENV==='production' 
                    ? `${AWSImageUrl}/images/${posf}/`
                    : `${backImageUrl}/${posf}/`;

    if(image.length>0 && preview==='N'){
        rootUrl+=image;
    }else{
        rootUrl=Url+'/jsMetaImage.gif';
    }

    return(
        <div>  
            <Head>
                    <title>{title} - 중소기업 정보전문 사이트</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" ></meta>
                    <meta name="robots" content="index,follow" ></meta>
                    <meta name="writer" conmtent={writer} ></meta>
                    <meta property="og:type" content="article" ></meta>
                    <meta property="og:url" content="http://www.jscompany.live" ></meta>
                    <meta property="og:title" content={title} ></meta>
                    <meta property="og:description" content={contents} ></meta>
                    <meta property="og:site_name" content="좋소" ></meta>
                    <meta property="og:image" content={rootUrl}></meta>
                    <meta property="og:image:width" content="80"></meta>
                    <meta property="og:image:height" content="60"></meta>
            </Head>

        </div>
    )

}

export default HeaderComponenet;