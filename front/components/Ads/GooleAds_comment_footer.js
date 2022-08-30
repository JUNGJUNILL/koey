import React , {useEffect}from 'react'

const GooleAds_comment_footer =() =>{

    useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

    },[])

    return (
        <ins className="adsbygoogle"
        style={{display:'block',border:'1px solid',minWidth:'400px',marginTop:'3%',maxWidth:'970px',width:'90%',height:'90px'}}
        data-ad-client={"ca-pub-9160341796142118"}
        data-ad-slot={"2812845805"}
        ></ins>
    )
}

export default GooleAds_comment_footer; 