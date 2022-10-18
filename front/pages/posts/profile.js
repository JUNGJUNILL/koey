import {END} from 'redux-saga'; 
import wrapper from '../../store/configureStore';
import React,{useEffect, useState}from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'antd'
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
           promotionCondition,
           promotionConditionClick,
           promotionCheckValue
        }      = useSelector((state)=>state.auth);

    useEffect(()=>{

        dispatch({type:PROMOTION_CHECK_VALUE_REQUEST,
                  data:{
                        userid,
                        userLevel
                }
        });

    },[]); 

    const promotionState='심사 중 입니다..';
    const promotionFunc = (level)=>{
        const levelValue =parseInt(level);
        let result='';

        switch(levelValue){
            case 10 : result='사원 승진 심사제출' 
            break;
            
            case 20 : result='주임 승진 심사제출' 
            break;

            case 30 : result='대리 승진 심사제출' 
            break;

            case 40 : result='과장 승진 심사제출' 
            break;

            case 50 : result='차장 승진 심사제출' 
            break;

            case 60 : result='부장 승진 심사제출' 
            break;

            case 70 : result='이사 승진 심사제출' 
            break;

            default : result='승진 심사 제출';
        }

        return result; 
    }   

    const promotionReview = () =>{
        
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
                
            }
        })

    }


    return (
        <div className='divTableDetail'>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>안녕하세요 {userInfo}님 {promotionCondition} : {promotionCheckValue}</p>
            </div>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>현재 당신의 직책은</p>
            </div>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>{userlevelName} 입니다.</p>
            </div>
            
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
             {/*
                promotionCondition이 null일 경우, 
                (버튼을 아직 클릭하지 않은 경우)
             */}
       
                <Button loading={promotionConditionClick} onClick={promotionReview}>{promotionFunc(userLevel)}</Button>
       

              {/*
                promotionCondition이 null이 아닐 경우,
                (버튼을 클릭 한 경우)
             */}
           
                <div><SyncOutlined spin={true}/>&nbsp;승진 심사 중 입니다..</div>         
     
             {/*
                승진 조건이 아니면 위에 버튼을 다 안보이고 
                "승진 할 수 있는 조건이 아닙니다. 승진 요건 보러가기"
                요 메시지만 보이게 하기 

                버튼을 클릭했는데 승진 요건이 아니야 
                그럼 1,2는 안보이고 3만 보이게 처리 
             */}
      

                <div>승진 할 수 있는 조건이 아닙니다. 승진 요건 보러가기</div>
        
             
             </div>

            
      </div>
    )
}


export default profile; 
