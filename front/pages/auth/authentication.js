import { useCallback,useState,useEffect,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select, Button  } from 'antd';
import { SEND_EMAIL_REQUEST,} from '../../reducers/auth'; 

const { Option } = Select;

const Authentication = () =>{


    const dispatch = useDispatch(); 
    const {emailSending,emailSendingResponse,userEmailadress,mailExistence} = useSelector(state => state.auth); 

    const [userEmailAdress,setUserEmailAddress] = useState(''); 
    const [eMailType,setEmailType] = useState('naver.com'); 

    const onSubmit = useCallback((e) =>{
        e.preventDefault();

        if(userEmailAdress===0){
            alert('이메일을 입력해 주시기 바랍니다.'); 
        }
        dispatch({type:SEND_EMAIL_REQUEST,
            data: {
                userEmailAdress:userEmailAdress,  
                eMailType:eMailType, 
                }
            }); 


    },[userEmailAdress,eMailType]); 

    const eMailTypechange = useCallback((value) =>{
        setEmailType(value); 

    },[eMailType]);

    const userEmailChange =useCallback((e)=>{
        setUserEmailAddress(e.target.value); 
    },[userEmailAdress]);

    const selectAfter = (
        <Select value={eMailType} onChange={eMailTypechange} className="select-after">
          <Option value="naver.com">@naver.com</Option>
          <Option value="nate.com">@nate.com</Option>
          <Option value="gmail.com">@gmail.com</Option>
          <Option value="daum.net">@daum.net</Option>
        </Select>
      );

    return(
        <>
        <form onSubmit={onSubmit}>
        {!emailSendingResponse && !userEmailadress 
            ? <div style={{textAlign:'center',marginTop:'5%',marginBottom:'3%',}}>

                 <div style={{display:'inline-block',height:'10vh',width:'80%',marginBottom:'3%'}}>{mailExistence ? mailExistence : '이메일 인증'}</div>
                <Input style={{width:'60%',marginBottom:'1%'}} type="text" value={userEmailAdress} onChange={userEmailChange} addonAfter={selectAfter} />
                <Button onClick={onSubmit} loading={emailSending} >보내기</Button>   
             </div>
        
            :<div style={{textAlign:'center',marginTop:'5%',marginBottom:'3%',}}>

            <div style={{display:'inline-block',height:'10vh',width:'90%',marginBottom:'3%'}}>
            이메일 인증 완료<br />
            {userEmailadress}에 성공적으로 메일을 발송하였습니다.<br />
            메일 확인후 본문안의 링크를 클릭하시어 회원가입을 계속 진행해 주시기 바랍니다. 
            </div>
            
        </div>
        }
        </form>
       
        </>
    )

}

export default Authentication; 