import { useDispatch, useSelector } from 'react-redux';


const profile = () =>{

    const {userInfo,userLevel}      = useSelector((state)=>state.auth);

    return (
        <div className='divTableDetail'>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>안녕하세요 {userInfo}님</p>
            </div>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>현재 당신의 직책은</p>
            </div>
            <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p>{userLevel} 입니다.</p>
            </div>
      </div>
    )
}

export default profile; 
