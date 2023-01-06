import {Button,Input,Select} from 'antd'; 
import { useState,useCallback,createRef,useEffect } from 'react';
import FadeIn from 'react-fade-in';
import Head from "next/head";
import wrapper from '../../store/configureStore';

const { Option } = Select;

const calculator002 =({
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
        const [dollar2,setDollar2] = useState(''); 
        const [result,setResult] =useState(0); 
        const [showFolmula,setShowFolmula] = useState(false);
        const focusDollar= createRef(); 
    
    
        useEffect(()=>{
            focusDollar.current.focus(); 
    
        },[])
    
        const onChangeDollar =useCallback((e) =>{
            setDollar(e.target.value); 
    
            const intDollar = e.target.value?parseInt(e.target.value):0; 
            const intdollar2= dollar2?parseInt(dollar2):0; 
            let resultValue=0; 
            
            resultValue = ((intdollar2-intDollar)/intDollar)*100;
            setResult(resultValue); 
    
        },[dollar,dollar2,result])
    
    
        const onChangedollar2=useCallback((e)=>{
            setDollar2(e.target.value); 

            const intDollar = dollar?parseInt(dollar):0; 
            const intdollar2= e.target.value?parseInt(e.target.value):0; 

            let resultValue=0; 
            
            resultValue = ((intdollar2-intDollar)/intDollar)*100;
            setResult(resultValue); 
    

        },[dollar,dollar2,result])



        const onClickShowformula=useCallback(()=>{
            setShowFolmula(true);

        },[showFolmula])


        return(
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
                <font style={{fontFamily:'Hanna',fontSize:'4vh'}}>몇 퍼센트(%)가 오른(내린) 건가요?</font>
            </div>
            
            <div className='imgDiv' style={{marginTop:'5%'}}>
                <div className='imgTextCenter' style={{fontFamily:'Hanna',fontSize:'5.5vh'}}>라면 가격이 올랐나요? 내렸나요?</div>
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
            </div>

            <div style={{width:'100%',textAlign:"center",marginTop:'3%'}}>
                <font style={{fontFamily:'Roboto-BlackItalic',fontSize:'5vh'}} >{Math.abs(result.toFixed(2))}% {parseInt(dollar) < parseInt(dollar2)?'증가.':parseInt(dollar)===parseInt(dollar2)?'':'감소.'}</font>        
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
                        /> 원 이었는데
                ,지금은 <Input placeholder='￦'
                                        type='number'   
                                        size='large'
                                        value={dollar2}
                                        onChange={onChangedollar2}
                                        style={{width:'100px',marginBottom:'1%',textAlign:'center'}}  
                        /> 원 이다.
                </font>
            </div>

            <div style={{width:'100%',textAlign:"center"}}>
                <font style={{fontFamily:'Roboto-Medium',fontSize:'3vh'}}>몇 퍼센트(%)가 {parseInt(dollar) < parseInt(dollar2)?'오른건가요?':parseInt(dollar)===parseInt(dollar2)?'':'내린건가요?'}</font>      
            </div>

            <div style={{width:'100%',textAlign:"center",marginTop:'3%'}}>
                <Button type='primary' style={{fontFamily:'Roboto-Medium'}} onClick={onClickShowformula}>공식 확인</Button>
            </div>
            <FadeIn delay={100} visible={showFolmula}>
            <div style={{fontFamily:'Roboto-BlackItalic',fontSize:'3vh',textAlign:"center",marginTop:'3%'}} >
                {`((${dollar2} - ${dollar}) / ${dollar}) * 100` }
            </div>
            </FadeIn>
        </div>   
        )



}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

 const SEOKEYWORD001='Online calculator';
 const SEOKEYWORD002='계산기';
 const SEOKEYWORD003='Online calculator';
 const SEOKEYWORD004='온라인 계산기';
 const SEOKEYWORD005='Scientific calculator online';
 const SEOKEYWORD006='dollar2age calculator';
 const SEOKEYWORD007='Calculus calculator';
 const SEOKEYWORD008='일반계산기';
 const SEOKEYWORD009='ratio';
 const SEOKEYWORD010='증감율 계산 공식';
 const SEOKEYWORD011='Simple calculator';
 const SEOKEYWORD012='증감률 계산기';
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


export default calculator002; 