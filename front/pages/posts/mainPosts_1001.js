
import React , {useState,useEffect,useCallback,useRef}from 'react'
import {Button,Input,Space,Select } from 'antd'
const { Option } = Select;
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
  const {userInfo,userid}       = useSelector((state)=>state.auth);

  const blank_pattern = /^\s+|\s+&/g; 
  const refSearchValue = useRef(); 
  const [searchCondition,setSearchCondition] = useState(''); 
  const searchConditionParam = router.query.searchCondition ? router.query.searchCondition : 'title'; 

  const [searchValue,setSearchValue]= useState(''); 
  const searchValueParam = router.query.searchValue ? router.query.searchValue : '';

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
                  pageNumber,
                  searchCondition:searchConditionParam ,
                  searchValue:encodeURIComponent(searchValueParam) ,
          }, 
        });

        }
     
    },[posf,searchValueParam,searchConditionParam]); 

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
           
          //해당 페이지 첫 렌더링
          //(페이징 숫자 클릭해서 렌더링되는게 아니다.) 
          setPageButtonClick(''); 
           if(!pageButtonClick){
            pagenate(parseInt(pages),pageArray);  
          }

          //게시판 이동 시 조회조건들 초기화
          setSearchValue(searchValueParam);
          setSearchCondition(searchConditionParam);
          

  },[pages,posf,searchValueParam,searchConditionParam]); 
 
  /*-------------------------------------------페이징 처리 로직   end-------------------------------------------------------*/

 
  //게시글 상세 페이지 
  const gotoDetail = useCallback((postId,userId,postFlag,submitDay,userNickName)=>{
     //window.localStorage.setItem('scrollY',window.scrollY);  
     router.push(`/posts/detailPage?postId=${postId}&postFlag=${postFlag}&submitDay=${submitDay}&who=${userid}&pid=${userId}&userNickName=${userNickName}` ,scroll=false); 
  },[]); 


  //게시글 쓰기
  const gotoEdit = useCallback(()=>{

    router.push(`/posts/postEdit?posf=${posf}`); 

  },[posf]); 

  //게시물 검색 조회 조건 변경
  const changeSearchCondition = useCallback((value) =>{
    setSearchCondition(value); 
  },[searchCondition]); 


  //게시물 검색
  const onSearch = useCallback(() =>{

    if(searchValue.length === 0 || searchValue.replace(blank_pattern,'')===""){
     
      setSearchValue(''); 
      refSearchValue.current.focus();    
      alert('검색어를 입력 해 주세요'); 
      return; 
    }

    if(searchValue.length === 1){

      refSearchValue.current.focus();
      alert('두 글자 이상 입력 해야 합니다.'); 
      return; 
    }

    router.push(`/posts/mainPosts_1001?nowPage=1&posf=${posf}&searchValue=${searchValue}&searchCondition=${searchCondition}`);

  },[posf,searchValue,searchCondition]); 

  //검색창 입력
  const onSearchValue = useCallback((e) =>{

    setSearchValue(e.target.value); 

  },[searchValue]); 

   return (
    <div>
{/* 
    <button onClick={executeScroll}>scroll to top</button>
*/}
 
    &nbsp;
    <Select  value={searchCondition} style={{marginTop:'3%',width:'30%'}} onChange={changeSearchCondition}>
      <Option value={'title'}>제목</Option>
      <Option value={'title_content'}>제목+내용</Option>
      <Option value={'userNickName'}>작성자</Option>
    </Select>
    &nbsp;
    <Search placeholder="search" ref={refSearchValue} value={searchValue} maxLength={25} onSearch={onSearch} onChange={onSearchValue} style={{marginTop:'3%',width:'40%'}} /> 
    {userInfo && <Button  onClick={gotoEdit} style={{marginTop:'3%',float:'right'}}><EditOutlined /> Write</Button>}

      <div className="divTable">
            {mainPosts_1001.map((v,i)=>(
                <div  className='divTableRow' onClick={()=>gotoDetail(v.postId,v.userid,posf,v.submitDay,userInfo)} style={{ backgroundColor:v.remark01==='best' ? '#ffdfbb':''}}>
               <div className='divTableImageCell'>
                  <div className="divImageCell">

                  
                  {/* 이미지 리사이징 (무슨 이유에서인지 잘 안됨 일단 원본으로 가자)      
                    <img src={v.imageCount > 0 ? `${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${encodeURIComponent(v.firstImageName)}` :`${backImageUrl}/noimages.gif`} />
                */}
                  {/*이미지 원본    */}
                    <img src={v.imageCount > 0 ? 
                      process.env.NODE_ENV==='production' 
                      ?
                      //람다
                      //`https://id6dso16db.execute-api.ap-northeast-2.amazonaws.com/helloWorld/imageResize-lambda?size=80x60`
                      //이미지 없음
                      //`${backImageUrl}/noimages.gif`
                      //이미지 리사이즈
                      //`${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${AWSImageUrl}/images/${posf}/${v.firstImageName}`
                      //이미지 원본
                      `${AWSImageUrl}/images/${posf}/${v.firstImageName}`
                      :
                      
                      //로컬 이미지 리사이즈
                      //`${backUrl}/imgResizing?size=80x60&posf=${posf}&fileName=${backImageUrl}/${posf}/${v.firstImageName}`
                      //로컬 이미지 원본
                      `${backImageUrl}/${posf}/${v.firstImageName}`
                    

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
                    <Link href={`/posts/detailPage?postId=${v.postId}&postFlag=${posf}&submitDay=${v.submitDay}&who=${userid}&pid=${v.userid}&userNickName=${userInfo}`

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
   
      <Pagenation pagenate={pagenate} 
                  dataLength={mainPosts_1001.length} 
                  postsPerPage={postsPerPage} 
                  nowPage={nowPage} 
                  groupPage={groupPage} 
                  groupPageArray={nowGroupPageArray} 
                  postFlag={posf} 
                  searchValue={searchValue} 
                  searchCondition={searchCondition}/>

    </div>
    );
}; 




export default mainPosts_1001; 