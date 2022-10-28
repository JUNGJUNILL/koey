import NossrToastEditor from '../../components/ToastUIComponent/NossrToastEditor'; 
import { useRouter } from 'next/router';

const posting = () =>{
    const router           = useRouter(); 
    const posf=router.query.posf?router.query.posf:'';
    //-------------------------------- 게시글 수정 시 필요한 변수------------------------------------
    const postId=router.query.postid?router.query.postid:'';
    const userId=router.query.userid?router.query.userid:'';
    const submitDay=router.query.submitday?router.query.submitday:'';
    const imageExist=router.query.imageexist?parseInt(router.query.imageexist):0;
    const updateFlag=router.query.updateflag?router.query.updateflag:'';
    //---------------------------------------------------------------------------------------------
    
    return (
        <>           
         <NossrToastEditor posf={posf}postId={postId}userId={userId}submitDay={submitDay}imageExist={imageExist}updateFlag={updateFlag}/>
        </>
    )
}

export default posting; 