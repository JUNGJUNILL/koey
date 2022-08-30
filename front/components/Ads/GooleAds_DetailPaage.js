import React , {useEffect}from 'react'

//메인 페이지 좋아요 싫어요 버튼 쪽
const GoogleAds_DetailPage = () =>{

    useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

    },[])

    return (
        <ins className="adsbygoogle"
            style={{display:'block',textAlign:'center'}}
            data-ad-layout={"in-article"}
            data-ad-format={"auto"}
            data-full-width-responsive={"true"}
            data-ad-client={"ca-pub-9160341796142118"}
            data-ad-slot={"6162979590"}></ins>
    )

}
export default GoogleAds_DetailPage; 