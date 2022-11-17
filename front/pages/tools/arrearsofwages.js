import React, { useCallback,useEffect, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select, Space, Table } from 'antd';
const { Option } = Select;
import { numToKorean, FormatOptions } from 'num-to-korean';

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
    keyword14
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

    //
    const onChangeMainLocal =(value)=>{
        let sum=0; 
        let changeList = originArray;

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


    return(
        <div>
           
            <div style={{width:'100%',textAlign:"center"}}>
                        <h1><font style={{fontFamily:'Hanna',fontSize:'4.5vh'}}>임금 체불사업주 명단공개</font></h1>
                        <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(체불액이 높은 순으로 정렬)</font>
            </div>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:'2%'}}>
                <font style={{fontFamily:'jua',fontSize:'2.2vh'}}>지역선택 :</font> &nbsp; 
                {/*광역 시 도 */}           
                <Select defaultValue={'all'} onChange={onChangeMainLocal} style={{width:'40%'}}>
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
            keyword14
        }, // will be passed to the page component as props
      } 
}); 


  export default arrearsofwages;