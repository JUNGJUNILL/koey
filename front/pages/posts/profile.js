import {END} from 'redux-saga'; 
import wrapper from '../../store/configureStore';
import Link from 'next/link'
import React,{useEffect, useState}from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {Button,Badge} from 'antd'
import { SyncOutlined,} from '@ant-design/icons';
import 
    {
        PROMOTION_REVIEW_REQUEST,
        PROMOTION_CHECK_VALUE_REQUEST
    } 
from '../../reducers/auth';

const profile = () =>{

    const dispatch = useDispatch(); 
    const {userInfo,
           userLevel,
           userlevelName,
           userid,
           promotionCheckValue,
           alarm01,
           promotionReviewValue
        }      = useSelector((state)=>state.auth);

    const [promotionBtnClick,setPromotionBtnClick] =useState(false); 
    
    
    useEffect(()=>{
        //승진 가능여부 실시간으로 가져오기 위함
        dispatch({type:PROMOTION_CHECK_VALUE_REQUEST,
                  data:{
                        userid,
                        userLevel,
                        alarm01
                }
        });

    },[]); 



    const promotionFunc = (level)=>{
        const levelValue =parseInt(level);
        let result='';

        switch(levelValue){
            case 10 : result='사원' 
            break;
            
            case 20 : result='주임' 
            break;

            case 30 : result='대리' 
            break;

            case 40 : result='과장' 
            break;

            case 50 : result='차장' 
            break;

            case 60 : result='부장' 
            break;

            case 70 : result='이사' 
            break;

            default : result='승진';
        }

        return result; 
    }   

    const promotionReview = () =>{
        setPromotionBtnClick(true); 
        if(!promotionCheckValue){
            return;
        }
        
        let promotionLevel=0; 
        switch(userLevel){
            case 10 : promotionLevel=5; //사원
            break;
            
            case 20 : promotionLevel=15; //주임
            break;

            case 30 : promotionLevel=30; //대리
            break;

            case 40 : promotionLevel=50; //과장
            break;

            case 50 : promotionLevel=70; //차장
            break;

            case 60 : promotionLevel=100; //부장
            break;

            case 70 : promotionLevel=150; //이사
            break;

            default : promotionLevel=0;
        }

        
        dispatch({
            type:PROMOTION_REVIEW_REQUEST,
            data:{
                userid,
                userLevel,
                promotionLevel,
                promotionCheckValue,
                alarm01        
            }
        })

    }


    return (
        <div className='divTableDetail'>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>안녕하세요 {userInfo}님</p>
            </div>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>현재 당신의 직책은</p>
            </div>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>{userlevelName} 입니다.</p>
            </div>
            
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            
            {(!promotionBtnClick && !promotionReviewValue) 
            && 
            <Badge count={alarm01==='Y'?'!':''} ><Button onClick={promotionReview}>{promotionFunc(userLevel)}&nbsp;승진 심사제출</Button></Badge>
            }
            {((promotionBtnClick && promotionCheckValue) || promotionReviewValue) 
            && 
            <div><SyncOutlined spin={true}/>&nbsp;{promotionFunc(userLevel)}승진 심사 중 입니다..</div>       
            }  
            
            {(promotionBtnClick && !promotionCheckValue) 
            && 
            <div>승진 할 수 있는 조건이 아닙니다. 
                <br />
                <Link href={{pathname:'/posts/[detailPage]',
                            query:{detailPage:'detailPage',
                            postId:'10000001',
                            postFlag:'1011',
                            submitDay:'99999999',
                            pid:'ZGV2amppMTIwN0BnbWFpbC5jb20=',  
                  },}}>
                    <a>
                    <div style={{textAlign:'center'}}>승진 요건 보러가기</div>
                    </a>
                </Link>
            </div>
            }
            
        
             
             </div>

            
      </div>
    )
}


export default profile; 
