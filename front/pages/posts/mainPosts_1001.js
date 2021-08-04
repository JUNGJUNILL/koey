
import React , {useState,useEffect,useCallback,useRef}from 'react'
import {Button,Input,Space } from 'antd'
const { Search } = Input;
import Router ,{ useRouter } from 'next/router';
import Link from 'next/link'
import wrapper from '../../store/configureStore';
import Pagenation from '../../util/Pagenation'
import {EditOutlined} from '@ant-design/icons'
import 
    {MAINPOSTS_1001_LIST_REQUEST,
     MAINPOSTS_1001_DETAIL_INFO_REQUEST
    } 
from '../../reducers/mainPosts_1001'; 

import 
    {LOAD_USER_REQUEST,
    } 
from '../../reducers/auth'; 
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from '../../util/isEmpty';
import custumDateFormat from  '../../util/custumDateFormat';
import { backImageUrl, AWSImageUrl, backUrl } from '../../config/config';



const mainPosts_1001 = ()=>{
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView(false);  //alert(myRef.current.value)//

  const dispatch         = useDispatch(); 
  const router           = useRouter(); 
  const {mainPosts_1001} = useSelector((state)=>state.mainPosts_1001); 
  const {userInfo}       = useSelector((state)=>state.auth);

  /*-------------------------------------------페이징 처리 로직 start-------------------------------------------------------*/
  const [nowPage,setNowPage] = useState(0);                       //현재 페이지
  const [postsPerPage] = useState(20);                             //한 페이지당 list 수 
  const [groupPage , setGroupPage] = useState(5);                 //페이징 그룹 당 수  1~5 , 6~10 , 11~15 ... 5의 배수만 입력가능 
  const [nowGroupPageArray,setNowGroupPageArray] =useState([]);   //현재 페이징 그룹 배열
  const pages=router.query.nowPage ? parseInt(router.query.nowPage) : 1;
  const group=router.query.group ? parseInt(router.query.group) : 0; 
  const posf=router.query.posf;  
  const [pageButtonClick,setPageButtonClick] = useState(''); 

  const pagenate =useCallback((pageNumber, groupPageArray, param)=>{

        if(!posf){
          return null; 
        }else{

          setPageButtonClick(param); 
          setNowPage(pageNumber); 
          nowGroupPageArray.length=0; 
  
          setNowGroupPageArray(nowGroupPageArray.concat(groupPageArray));
  
          const indexOfLastPost = pageNumber * postsPerPage;   
          const indexOfFirstPost = indexOfLastPost - postsPerPage;  
  
          dispatch({
            type:MAINPOSTS_1001_LIST_REQUEST, 
            data:{postFlag:posf,
                  currentPage:indexOfFirstPost,
                  maxPage:postsPerPage,
                  pageNumber
          }, 
        });

        }
     
    },[posf]); 

  //01.페이지 첫 로드시.. 
  //02.상세 정보 본 후 뒤로 가기 눌렀을 경우 
  //03.페이지 이동 후 뒤로가기 눌렀을 경우
  useEffect(()=>{
  
          //초기에 groupPage 만큼 배열을 생생해 주어야 한다. 
          let pageArray =Array.from({length: groupPage}, (v, i) => i);

          //groupPage 페이지 그룹 변경 시 로직 (5에서 ▶ 눌렀을 때)
          if((group % groupPage === 0 )){
                  pageArray.length=0; 

                    for(let i=group; i<group+groupPage; i++){
                      pageArray.push(i); 

                    }
              }
              
          setPageButtonClick(''); 
           if(!pageButtonClick){
            pagenate(parseInt(pages),pageArray);  
          }
        
  },[pages,posf]); 
 
  /*-------------------------------------------페이징 처리 로직   end-------------------------------------------------------*/

 
  //게시글 상세 페이지 
  const gotoDetail = useCallback((postId,userNickName,postFlag,submitDay,userInfo)=>{
     //window.localStorage.setItem('scrollY',window.scrollY);  
    
     router.push(`/posts/detailPage?postId=${postId}&userNickName=${userNickName}&postFlag=${postFlag}&submitDay=${submitDay}&who=${userInfo}` ,scroll=false); 
  },[]); 


  //게시글 쓰기
  const gotoEdit = useCallback(()=>{

    router.push(`/posts/postEdit?posf=${posf}`); 

  },[posf]); 

  const onSearch = (e) =>console.log(e.target.value); 


   return (
    <div>
{/* 
    <button onClick={executeScroll}>scroll to top</button>
*/}
    &nbsp;<Search placeholder="input search text" onSearch={onSearch} style={{marginTop:'3%',width:'50%'}} /> 
    {userInfo && <Button  onClick={gotoEdit} style={{marginTop:'3%',float:'right'}}><EditOutlined /> Write</Button>}

      <div className="divTable">
            {mainPosts_1001.map((v,i)=>(
                <div  className='divTableRow' onClick={()=>gotoDetail(v.postId,v.userNickName,posf,v.submitDay,userInfo)} style={{ backgroundColor:v.remark01==='best' ? '#ffdfbb':''}}>
               <div className='divTableImageCell'>
                  <div className="divImageCell">

                  
                  {/* 이미지 리사이징 (무슨 이유에서인지 잘 안됨 일단 원본으로 가자)      
                    <img src={v.imageCount > 0 ? `${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${encodeURIComponent(v.firstImageName)}` :`${backImageUrl}/noimages.gif`} />
                */}
                  {/*이미지 원본    */}
                    <img src={v.imageCount > 0 ? 
                      process.env.NODE_ENV==='production' 
                      ?
                      `http://captainryan.iptime.org:3333/api/imgResizing?size=80x60&fileName=${AWSImageUrl}/images/${posf}/${v.firstImageName}`//`${backImageUrl}/noimages.gif`//`${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${AWSImageUrl}/images/${posf}/${v.firstImageName}`
                      :
                      `${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${backImageUrl}/${posf}/${v.firstImageName}`
                    

                      :`${backImageUrl}/noimages.gif`} />
              

                  {/*AWS용
                  <img src={v.imageCount > 0 ? `${v.firstImageName}` :`${backImageUrl}/noimages.gif`} />
                  */}

                  </div>
               </div>

                {/* 
                  <div className='divTableCell'>
                    <div className="divImageCell">
                      <img src={'https://upload.wikimedia.org/wikipedia/ko/6/60/%EA%B8%B0%EC%83%9D%EC%B6%A9_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg'} />
                    </div>
                  </div>
                */}

                  <div className="divTableCell" >    
                    <Link href={`/posts/detailPage?postId=${v.postId}&userNickName=${v.userNickName}&postFlag=${posf}&submitDay=${v.submitDay}&who=${userInfo}`

                  }><a>
                  
                    <font size="2">

                  {v.remark01==='best' ? <span className='bestSpan'>BEST</span> : ''}  <b>{isEmpty(v.title)}</b> 
                    </font>
               
                    </a></Link><span className="countFontColor">[{v.commentCount}] </span>

                    <br/>

                    <div style={{marginTop:'3%'}}>
                      <font size="1" style={{opacity:'0.7'}}>추천 {v.good}  </font>
                    <br/>
                      <font size="1" style={{opacity:'0.7'}}>{isEmpty(v.userNickName)}  {custumDateFormat(v.createdDate)}</font>
                     
                    </div>
                  </div>
              </div>
            ))}
      </div>
   
      <Pagenation pagenate={pagenate} dataLength={mainPosts_1001.length} postsPerPage={postsPerPage} nowPage={nowPage} groupPage={groupPage} groupPageArray={nowGroupPageArray} postFlag={posf}/>

    </div>
    );
}; 




export default mainPosts_1001; 