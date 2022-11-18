import React, { useCallback,useEffect, useState, createRef,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select, Input, } from 'antd';
const { Option } = Select;
const { Search } = Input;

import { numToKorean, FormatOptions } from 'num-to-korean';
import Head from "next/head";
import Link from 'next/link'

import wrapper from '../../store/configureStore';
import {END} from 'redux-saga'; 
import axios from  'axios'; 

import GoogleAds_MainPage01 from '../../components/Ads/GoogleAds_MainPage01';
import GooleAds_footer from '../../components/Ads/GooleAds_footer';
import GooleAds_header from '../../components/Ads/GooleAds_header';
import {localDataList} from '../../components/tools/localData'; 
import {arrearsofwagesData} from '../../components/tools/arrearsofwagesData'; 


const arrearsofwages = ({
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


    //데이터
    const [originArray,originSetArray] = useState([...arrearsofwagesData]);
    const [array,setArray] = useState([...arrearsofwagesData]);

    const [moneySum , setMoneySum] =useState(0);

    useEffect(()=>{
        let sum = 0;
        array.map((v)=>{
            sum+=v.money;
        }); 

        setMoneySum(sum)

    },[moneySum]); 
     
  
    //광역시, 도 list
    const mainLocal = localDataList.filter((v,i,array)=>{

        if(v.city===v.cityCode){
            return array;
        }

    }); 

    const refRegion = useRef(); 
    const [regionValue, setRegionValue] = useState('all'); 
    //지역 변경 함수
    const onChangeMainLocal =(value)=>{
        let sum=0; 
        let changeList = originArray;
        window.localStorage.setItem('scrollY',0); 
        
        setRegionValue(value); 
        setSearchValue(''); 
        setSearchCondition('store'); 

        searchCondition
        if(value!=='all'){
            changeList = originArray.filter((v,i,arr)=>{
                if(v.region === value){
                    return arr;
                }
            }); 
        }

        changeList.map((v)=>{
            sum+=v.money;
        })


        setArray([...changeList]); 
        setMoneySum(sum); 
    }


    const [searchValue,setSearchValue]= useState(''); 
    const [searchCondition,setSearchCondition] = useState('store'); 
    const refSearchValue = useRef(); 
    const blank_pattern = /^\s+|\s+&/g; 

    //검색창 입력
    const onSearchValue = useCallback((e) =>{

        setSearchValue(e.target.value); 

    },[searchValue]); 

    //게시물 검색 조회 조건 변경
    const changeSearchCondition = useCallback((value) =>{
        setSearchCondition(value); 
    },[searchCondition]); 

  //게시물 검색
  const onSearch = useCallback(() =>{
    let changeList = originArray;

    if(searchValue.length === 0 || searchValue.replace(blank_pattern,'')===""){
        setArray([...changeList]); 
        return;
    }

    if(searchCondition==='store'){

        changeList = originArray.filter((v,i,array)=>{
            if(regionValue!=='all'){
                if(v.region===regionValue && v.store.indexOf(searchValue)!==-1){
                    return array; 
                }
            }else{
                if(v.store.indexOf(searchValue)!==-1){
                    return array; 
                }
            }
       
        }); 

    }else{

        changeList = originArray.filter((v,i,array)=>{
            if(regionValue!=='all'){
                if(v.region===regionValue && v.ceo.indexOf(searchValue)!==-1){
                    return array; 
                }
            }else{
                if(v.ceo.indexOf(searchValue)!==-1){
                    return array; 
                }
            }
       
        }); 

    }

    setArray([...changeList]); 

  },[searchCondition,searchValue,regionValue]); 
    


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
   
            <div style={{width:'100%',textAlign:"center"}}>
                        <h1><font style={{fontFamily:'Hanna',fontSize:'4.5vh'}}>임금체불 사업주 명단공개</font></h1>
                        <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(체불액이 높은 순으로 정렬)</font>
            </div>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:'2%'}}>
                <font style={{fontFamily:'jua',fontSize:'2.2vh'}}>지역선택 :</font> &nbsp; 
                {/*광역 시 도 */}           
                <Select defaultValue={'all'} ref={refRegion} onChange={onChangeMainLocal} style={{width:'40%'}}>
                    <Option value={'all'} >전체</Option>
                {mainLocal.map((v)=>(              
                    <Option value={v.regionName} >{v.regionNameHangul}</Option>
                ))}
                </Select>
            </div>

            <br />

            <div style={{width:'100%',textAlign:"center"}}>
                <font style={{fontFamily:'jua',fontSize:'3vh',}}>총 체불액 : {numToKorean(moneySum, 'mixed')}원</font> <br/>
            </div>
            <div style={{width:'100%',textAlign:"center"}}>
                &nbsp;
                <Select  value={searchCondition} style={{marginTop:'3%',width:'25%'}} onChange={changeSearchCondition}>
                    <Option value={'store'}>회사명</Option>
                    <Option value={'ceo'}>대표명</Option>
                </Select>
                &nbsp;
                <Search placeholder="검색" ref={refSearchValue}  value={searchValue} maxLength={25} onSearch={onSearch} onChange={onSearchValue} style={{marginTop:'3%',width:'50%'}} /> 
            </div>
       

            <GooleAds_footer />
            <div className='divTable'>
            {array && array.map((v,i)=>(
                <div className='divTableRow' style={{height:'100%'}}>
                    <div className='divTableCell02' style={{height:'70px',justifyContent:'space-between', flexDirection:'column'}}>
                        <font color={i<=2 ? 'red' : ''} style={{fontFamily:'Hanna',fontSize:'2.5vh'}}>
                        {v.store}
                        </font>
                        <br />
                        <font style={{fontFamily:'jua',fontSize:'3vh'}}>&nbsp;체불액 : {numToKorean(v.money, 'mixed')} 원</font>   
                        <br />
                        <font style={{fontFamily:'jua',fontSize:'2vh'}}>&nbsp;{v.money.toLocaleString('ko-KR')} 원</font>
                        <br />
                        <font style={{fontFamily:'jua',fontSize:'2vh'}}>&nbsp;주소 : {v.address}</font>
                        <br />
                        <font style={{fontFamily:'jua',fontSize:'2vh'}}>&nbsp;대표자 : {v.ceo}</font>
                    </div>
                </div>
                ))}
            </div>
                <p style={{marginTop:'2%'}}>자료출처 : <Link href={{pathname:'https://www.moel.go.kr/info/defaulter/list.do'}}><a target='_blank'>고용노동부</a></Link></p>
            <GoogleAds_MainPage01 />

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


  export default arrearsofwages;