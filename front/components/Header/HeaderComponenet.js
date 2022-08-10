
import jsMetaImage from '../../public/jsMetaImage.gif';
import { backImageUrl,AWSImageUrl } from '../../config/config';
import Head from "next/head";

const HeaderComponenet =({posf,title,image})=>{

    
    let rootUrl = process.env.NODE_ENV==='production' 
                    ? `${AWSImageUrl}/images/${posf}/`
                    : `${backImageUrl}/${posf}/`;

    if(image.length>0){
        rootUrl+=image;
    }else{
        rootUrl='';
    }

    return(
        <Head>
                <meta property="og:url" content="http://www.jscompany.live"></meta>
                <meta property="og:image" content={rootUrl.length===0?jsMetaImage:rootUrl}></meta>
                <meta property="og:title" content={title} />
                <meta property="og:description" content='중소기업 썰 ㅋ'></meta>
        </Head>
    )

}

export default HeaderComponenet;