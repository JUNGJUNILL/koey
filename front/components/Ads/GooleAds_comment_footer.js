import React , {useEffect}from 'react'

const GooleAds_comment_footer =() =>{

    useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

    },[])

    return (
        <>
            <ins className="adsbygoogle"
            style={{display:'block',minWidth:'360px',maxWidth:'970px',width:'100%',height:'90px'}}
            data-ad-client={"ca-pub-9160341796142118"}
            data-ad-slot={"2812845805"}
            ></ins>
        </>
    )
}

export default GooleAds_comment_footer; 