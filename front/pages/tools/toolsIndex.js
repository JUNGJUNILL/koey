import { Url } from '../../config/config';
import Link from 'next/link'
import wrapper from '../../store/configureStore';



const toolsIndex = ({
    keyword01,
    keyword02,
    keyword03,
    keyword04,
    keyword05,
    keyword06,
    keyword07,
    keyword08,
    keyword09,
    keyword10,
    keyword11,
    keyword12,
    keyword13,
    keyword14,
    keyword15
}) =>{


    const array = [{"name":"라면 가격이 얼마인거니?","url":"calculator001"},
                   {"name":"라면이 몇 퍼센트(%) 오른거니?","url":"calculator002"},
                   {"name":"라면 가격이 오르기(내리기) 전 금액","url":"calculator003"},
                   {"name":"엑셀 중복값 확인","url":"calculator003"},
                 ]; 

    return(
        <div>
                        <Head>
                <title>좋소 - 임금체불 사업자 명단</title>
                <meta name='description' content="임금체불 사업자 명단공개"></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" ></meta>
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" ></meta>
                <meta name="writer" conmtent='jji' ></meta>
                <meta property="og:locale" content='ko_KR' />
                <meta property="og:type" content="article" ></meta>
                <meta property="og:title" content="임금체불 사업자 명단" ></meta>
                <meta property="og:description" content="임금체불 사업자 명단" ></meta>
                <meta property="og:url" content="http://www.jscompany.live" ></meta>
                <meta property="og:site_name" content="좋소" ></meta>
                <meta property="og:image" content='http://jscompany.live/jsMetaImage.gif'></meta>
                <meta property="og:image:width" content="80"></meta>
                <meta property="og:image:height" content="60"></meta>
                <meta property="og:image:type" content='gif'></meta>
            </Head>
            <div className='imgTextSEO'>{keyword01}</div>
            <div className='imgTextSEO'>{keyword02}</div>
            <div className='imgTextSEO'>{keyword03}</div>
            <div className='imgTextSEO'>{keyword04}</div>
            <div className='imgTextSEO'>{keyword05}</div>
            <div className='imgTextSEO'>{keyword06}</div>
            <div className='imgTextSEO'>{keyword07}</div>
            <div className='imgTextSEO'>{keyword08}</div>
            <div className='imgTextSEO'>{keyword09}</div>
            <div className='imgTextSEO'>{keyword10}</div>
            <div className='imgTextSEO'>{keyword11}</div>
            <div className='imgTextSEO'>{keyword12}</div>
            <div className='imgTextSEO'>{keyword13}</div>
            <div className='imgTextSEO'>{keyword14}</div>
            <div className='imgTextSEO'>{keyword15}</div>   
            
            <div className='divTable'>
            {array && array.map((v,i)=>(
                <div className='divTableRow' style={{height:'100%'}}>
               <div className='divTableImageCell'>
                  <div className="divImageCell">

                  
                  {/* 이미지 리사이징 (무슨 이유에서인지 잘 안됨 일단 원본으로 가자)      
                    <img src={v.imageCount > 0 ? `${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${encodeURIComponent(v.firstImageName)}` :`${backImageUrl}/noimages.gif`} />
                  */}
                  {/*이미지 원본    */}
                    <img src={`${Url}/noimages.gif`} />
                  </div>
               </div>

                    <div className='divTableCell02' style={{height:'70px',justifyContent:'space-between', flexDirection:'column'}}>
                        <font color={i<=2 ? 'red' : ''} style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>
                        <Link href={{pathname:`/tools/${v.url}`}}><a>{v.name}</a></Link>
                        </font>                     
                    </div>
                </div>
                ))}
            </div>
        </div>  
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {



    const keyword01='임금체불';
    const keyword02='임금체불 기준';
    const keyword03='임금체불 신고 후기';
    const keyword04='임금체불 뜻';
    const keyword05='임금체불신고 방법';
    const keyword06='임금체불 처벌';
    const keyword07='임금체불 사업주 불이익';
    const keyword08='임금체불 기간';
    const keyword09='임금체불 14일';
    const keyword10='임금 체불 노무사 비용';
    const keyword11='임금 체불 실업 급여';
    const keyword12='노동청 임금 체불';
    const keyword13='임금 체불 이란';
    const keyword14='재직 중 임금 체불';
    const keyword15='중소기업 커뮤니티';
    
    
    
    return {
        props: {
            keyword01,
            keyword02,
            keyword03,
            keyword04,
            keyword05,
            keyword06,
            keyword07,
            keyword08,
            keyword09,
            keyword10,
            keyword11,
            keyword12,
            keyword13,
            keyword14,
            keyword15
        }, // will be passed to the page component as props
      } 
}); 

export default toolsIndex; 