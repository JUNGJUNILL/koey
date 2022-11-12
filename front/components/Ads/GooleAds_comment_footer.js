import React , {useEffect}from 'react'

const GooleAds_comment_footer =() =>{

    useEffect(()=>{
        const ads = document.getElementsByClassName("adsbygoogle").length;
        for (let i = 0; i < ads; i++) {
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) { }
        }
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