import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'antd'
import 
    {
        PROMOTION_REVIEW_REQUEST
    } 
from '../../reducers/auth';

const profile = () =>{

    const dispatch = useDispatch(); 
    const {userInfo,userLevel,userlevelName,userid,promotionCondition,promotionConditionClick}      = useSelector((state)=>state.auth);
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
            case 10 : promotionLevel=3;
            break;
            
            case 20 : promotionLevel=30;
            break;

            case 30 : promotionLevel=40;
            break;

            case 40 : promotionLevel=50
            break;

            case 50 : promotionLevel='차장 승진 심사제출' 
            break;

            case 60 : promotionLevel='부장 승진 심사제출' 
            break;

            case 70 : promotionLevel='이사 승진 심사제출' 
            break;

            default : promotionLevel='승진 심사 제출';
        }

        
        
        dispatch({
            type:PROMOTION_REVIEW_REQUEST,
            data:{
                userid,
                userLevel,
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
             <Button loading={promotionConditionClick} onClick={promotionReview}>{promotionFunc(userLevel)}</Button>
            </div>

            
      </div>
    )
}

export default profile; 
