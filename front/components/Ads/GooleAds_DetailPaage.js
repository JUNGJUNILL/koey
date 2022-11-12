import React , {useEffect}from 'react'

//상세 페이지 좋아요 싫어요 버튼 쪽
const GoogleAds_DetailPage = () =>{

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
                style={{display:'block', textAlign:'center'}}
                data-ad-layout={"in-article"}
                data-ad-format={"fluid"}
                data-ad-client={"ca-pub-9160341796142118"}
                data-ad-slot={"6162979590"}></ins>
        </>
    )

}
export default GoogleAds_DetailPage; 