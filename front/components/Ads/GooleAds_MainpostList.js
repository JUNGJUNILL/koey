import React , {useEffect}from 'react'

//페이징 부분 하단
const GooleAds_MainpostList =()=>{


    useEffect(()=>{
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});

    },[])


    return(
        <div>
            <ins class="adsbygoogle"
                style="display:block; text-align:center;"
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-9160341796142118"
                data-ad-slot="7256569410"></ins>
        </div>
    )

}

export default GooleAds_MainpostList; 