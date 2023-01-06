import {Button,Input,Select} from 'antd'; 
import { useState,useCallback,createRef,useEffect } from 'react';
import FadeIn from 'react-fade-in';
import Head from "next/head";
import wrapper from '../../store/configureStore';

import GoogleAds_MainPage01 from '../../components/Ads/GoogleAds_MainPage01';
import GooleAds_footer from '../../components/Ads/GooleAds_footer';

const { Option } = Select;

const calculator001=({
    SEOKEYWORD001,
    SEOKEYWORD002,
    SEOKEYWORD003,
    SEOKEYWORD004,
    SEOKEYWORD005,
    SEOKEYWORD006,
    SEOKEYWORD007,
    SEOKEYWORD008,
    SEOKEYWORD009,
    SEOKEYWORD010,
    SEOKEYWORD011,
    SEOKEYWORD012,
    SEOKEYWORD013,
    SEOKEYWORD014,
    SEOKEYWORD015,
    SEOKEYWORD016,
    SEOKEYWORD017})=>{

    const [dollar,setDollar] = useState(''); 
    const [percent,setPercent] = useState(''); 
    const [check,setCheck] = useState('up');
    const [result,setResult] =useState(0); 
    const [showFolmula,setShowFolmula] = useState(false);
    const focusDollar= createRef(); 


    useEffect(()=>{
        focusDollar.current.focus(); 

    },[])

    const onChangeDollar =useCallback((e) =>{
        setDollar(e.target.value); 

        const intDollar = e.target.value?parseInt(e.target.value):0; 
        const intPercent= percent?parseInt(percent):0; 
        let resultValue=0; 

        if(check==='up'){
            resultValue=intDollar*((100)+intPercent)/100; 
            setResult(resultValue);
        }else{
            resultValue=intDollar*((100)-intPercent)/100; 
            setResult(resultValue);
        }

    },[dollar])


    const onChangePercent=useCallback((e)=>{
        setPercent(e.target.value); 

        const intDollar = dollar?parseInt(dollar):0; 
        const intPercent= e.target.value?parseInt(e.target.value):0; 
        let resultValue=0; 

        if(check==='up'){
            resultValue=intDollar*((100)+intPercent)/100; 
            setResult(resultValue);
        }else{
            resultValue=intDollar*((100)-intPercent)/100; 
            setResult(resultValue);
        }

    },[dollar,percent])

    const onChangeCondition = useCallback((value)=>{
        const intDollar = dollar?parseInt(dollar):0; 
        const intPercent= percent?parseInt(percent):0; 
        let resultValue=0; 
  
        if(value==='up'){
            resultValue=intDollar*((100)+intPercent)/100; 
            setResult(resultValue);
        }else{
            resultValue=intDollar*((100)-intPercent)/100; 
            setResult(resultValue);
        }
        setCheck(value); 
      
        
    },[check,dollar,percent,check,result])


    const onClickShowformula=useCallback(()=>{
        setShowFolmula(true)

    },[showFolmula])

    const func = ((param)=>{
        const pattern = /\d{1,3}(?=(\d{3})+(?!\d))/g; 
        let result=param+'';
        return result.replace(pattern,'$&,'); 
    })
  


    return (
        <div>  
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" ></meta>
                <meta name="robots" content="index,follow" ></meta>
                <meta name="writer" conmtent='jji' ></meta>
                <meta name ="reply-to" content="devjji1207@gmail.com" />
                <meta property="og:type" content="article" ></meta>
                <meta property="og:title" content={SEOKEYWORD015} ></meta>
                <meta property="og:description" content={SEOKEYWORD015} ></meta>
                <meta property="og:site_name" content="helloapp" ></meta>
            </Head>

            <div style={{width:'100%',textAlign:"center",marginTop:'5%'}}>
                <font style={{fontFamily:'Hanna',fontSize:'4vh'}}>증감율 구하기</font>
            </div>
            
            <div className='imgDiv' style={{marginTop:'5%'}}>
                <div className='imgTextCenter' style={{fontFamily:'Hanna',fontSize:'5.5vh'}}>라면의 가격은 얼마인가?</div>
                <div className='imgTextSEO'>{SEOKEYWORD001}</div>
                <div className='imgTextSEO'>{SEOKEYWORD002}</div>
                <div className='imgTextSEO'>{SEOKEYWORD003}</div>
                <div className='imgTextSEO'>{SEOKEYWORD004}</div>
                <div className='imgTextSEO'>{SEOKEYWORD005}</div>
                <div className='imgTextSEO'>{SEOKEYWORD006}</div>
                <div className='imgTextSEO'>{SEOKEYWORD007}</div>
                <div className='imgTextSEO'>{SEOKEYWORD008}</div>
                <div className='imgTextSEO'>{SEOKEYWORD009}</div>
                <div className='imgTextSEO'>{SEOKEYWORD010}</div>
                <div className='imgTextSEO'>{SEOKEYWORD011}</div>
                <div className='imgTextSEO'>{SEOKEYWORD012}</div>
                <div className='imgTextSEO'>{SEOKEYWORD013}</div>
                <div className='imgTextSEO'>{SEOKEYWORD014}</div>
                <div className='imgTextSEO'>{SEOKEYWORD015}</div>
                <div className='imgTextSEO'>{SEOKEYWORD016}</div>
                <div className='imgTextSEO'>{SEOKEYWORD017}</div>
                <div className='imgBase'>
                    <img src='../ramen.webp' /> 
                </div>
                <GooleAds_footer />
            </div>

            <div style={{width:'100%',textAlign:"center",marginTop:'3%'}}>
                <font style={{fontFamily:'Roboto-BlackItalic',fontSize:'5vh'}} >￦{func(result)}</font>        
            </div>
       
            <div style={{width:'100%',textAlign:"center",marginTop:'3%'}}>
                <font style={{fontFamily:'Roboto-Medium',fontSize:'3vh'}}>
                라면이 
                            <Input  
                                    ref={focusDollar}
                                    placeholder='￦'
                                    type='number'    
                                    size='large'   
                                    value={dollar}        
                                    onChange={onChangeDollar} 
                                    style={{width:'100px',marginBottom:'1%',textAlign:'center'}}  
                        />
                원 이었는데,
                &nbsp;<Input placeholder='％'
                                        type='number'   
                                        size='large'
                                        value={percent}
                                        onChange={onChangePercent}
                                        style={{width:'70px',marginBottom:'1%',textAlign:'center'}}  
                        />
                
                퍼센트
                <Select defaultValue={check} size='large' onChange={onChangeCondition}>
                                <Option value="up">올랐다.</Option>
                                <Option value="down">내렸다.</Option>
                        </Select>       
                 &nbsp; &nbsp;라면의 가격은?
                </font>
            </div>

            <div style={{width:'100%',textAlign:"center",marginTop:'3%'}}>
                <Button type='primary' style={{fontFamily:'Roboto-Medium'}} onClick={onClickShowformula}>공식 확인</Button>
            </div>
            <FadeIn delay={100} visible={showFolmula}>
            <div style={{fontFamily:'Roboto-BlackItalic',fontSize:'3vh',textAlign:"center",marginTop:'3%'}} >
                {`${dollar} * ((100)${check==='up'?'+':'-'}${percent}) / 100` }
            </div>
            </FadeIn>
            <GoogleAds_MainPage01 />

        </div>   
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

    const SEOKEYWORD001='Online calculator';
    const SEOKEYWORD002='Google calculator';
    const SEOKEYWORD003='Online calculator';
    const SEOKEYWORD004='Math calculator';
    const SEOKEYWORD005='Scientific calculator online';
    const SEOKEYWORD006='Percentage calculator';
    const SEOKEYWORD007='Calculus calculator';
    const SEOKEYWORD008='Root calculator';
    const SEOKEYWORD009='ratio';
    const SEOKEYWORD010='rate';
    const SEOKEYWORD011='Simple calculator';
    const SEOKEYWORD012='Unit rate';
    const SEOKEYWORD013='Calculator online';
    const SEOKEYWORD014='Interest rate calculator';
    const SEOKEYWORD015='Ratio calculator';
    const SEOKEYWORD016='Proportion ratio';
    const SEOKEYWORD017='Ratio of a to b';

    return{
        props: {SEOKEYWORD001,
                SEOKEYWORD002,
                SEOKEYWORD003,
                SEOKEYWORD004,
                SEOKEYWORD005,
                SEOKEYWORD006,
                SEOKEYWORD007,
                SEOKEYWORD008,
                SEOKEYWORD009,
                SEOKEYWORD010,
                SEOKEYWORD011,
                SEOKEYWORD012,
                SEOKEYWORD013,
                SEOKEYWORD014,
                SEOKEYWORD015,
                SEOKEYWORD016,
                SEOKEYWORD017,
        }, // will be passed to the page component as props
    }

});

export default calculator001; 