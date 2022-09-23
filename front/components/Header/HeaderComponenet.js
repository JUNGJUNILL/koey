
import jsMetaImage from '../../public/jsMetaImage.gif';
import { backImageUrl,AWSImageUrl } from '../../config/config';
import { Helmet } from "react-helmet"
import Head from "next/head";

import { Url } from '../../config/config';


const HeaderComponenet =({posf,title,image,contents,preview})=>{

    
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
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="robots" content='index,follow' />
                    <meta name ="author" content="JJI" />
                    <meta name ="reply-to" content="devjji1207@gmail.com" />
                    <meta property="og:url" content="http://www.jscompany.live"></meta>
                    <meta property="og:image" content={rootUrl}></meta>
                    <meta property="og:image:width" content="80"></meta>
                    <meta property="og:image:height" content="60"></meta>
                    <meta property="og:title" content={title ? title : '좋소! 썰'} />
                    <meta property="og:description" content={contents? contents+'#훯붫퀔' : '중소기업 썰 ㅋ'}></meta>
            </Head>

        </div>
    )

}

export default HeaderComponenet;