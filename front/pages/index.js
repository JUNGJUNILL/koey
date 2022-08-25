import React,{useEffect}from 'react'
import Link from 'next/link'
import {END} from 'redux-saga'; 
import wrapper from '../store/configureStore';
import { useSelector } from 'react-redux';
import Image from 'next/image'
import axios from 'axios';

import {Button} from 'antd';
import { useRouter } from 'next/router';
import noimages from '/public/noimages.gif'


import 
    {INDEX_PAGE_DATA_1001_REQUEST
    } 
from '../reducers/indexPage'; 
import 
    {LOAD_USER_REQUEST,} 
from '../reducers/auth'; 
import custumDateFormat from '../util/custumDateFormat';




const MainPage =()=>{

    const {data01} = useSelector((state)=>state.indexPage); 
    const router           = useRouter(); 

    const moreView =()=>{
    router.push({pathname:'/posts/mainPosts_1001',
                  query:{ 
                    nowPage:1,
                    posf:'1001',

                  },
               
                  
                  
        }); 
    }
    const gotoDetail = (postId,userId,postFlag,submitDay,userNickName)=>{
      router.push({pathname:'/posts/[detailPage]',
                    query:{detailPage:'detailPage', 
                           postId:postId,
                           postFlag:postFlag,
                           submitDay:submitDay,
                           pid:userId,
                           userNickName:'',                     
                           who:'',
                    },
                 
                    
                    
          }); 
        
      }; 



    return (
        <div>
             <div style={{width:'100%',textAlign:"center"}}>
                    <font style={{fontFamily:'Hanna',fontSize:'3vh'}}>우리나라 중소기업 관련 자료</font> <br/>
                    <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>(인기순으로 정렬)</font>
            </div>

            <div className='divTable'>
                {data01 && data01.map((v,i)=>(
                <div className='divTableRowTEST' key={i} onClick={()=>gotoDetail(v.postId,v.userid,'1001',v.submitDay,v.userNickName)}>
                    {/* col1 */}
                    <div className='divTableImageCell'>
                    <div className="divImageCell" style={{alignItems:"center"}}><Image src={i<=2
                                                                                                                            ?`https://www.hubpass.co.kr/external/images/a1001/${i===0?'rank_1':i===1?'rank_2':'rank_3'}.jpg`
                                                                                                                            :v.storeCount === '0'
                                                                                                                            ? 'https://www.hubpass.co.kr/external/images/a1001/noorder.gif' 
                                                                                                                            :'https://www.hubpass.co.kr/external/images/a1001/delivery.gif'

                                                                                                                    }
                                                                                                                    
                                                                                                                    alt={noimages}
                                                                                                                    width={80} height={60}
                                                                                                                    layout='responsive'
                                                                                                                    />  </div>
                    </div>

                    {/* col2 */}                                                                                                      
                    <div className='divTableCellTEST'>
                        <font className="abbreviation" color={i<=2 ? 'red' : ''} style={{fontFamily:'Hanna',fontSize:'3vh'}}>
                        {v.title}
                        </font>
                      <br/>
                        <font  className="abbreviation" style={{fontFamily:'jua',fontSize:'2vh'}}>&nbsp;{v.content}</font>

                      <br/>
                        <font style={{fontFamily:'jua',fontSize:'2vh',opacity:'0.6'}}>&nbsp;{v.userNickName},{custumDateFormat(v.createdDate)}</font>            


                    </div>



                  
                </div>
                ))}
            </div>
            <Button type="primary" onClick={moreView}  block>더 보기 ▼</Button>

        </div>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
      const cookie = context.req ? context.req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (context.req && cookie) { //쿠키 공유 방지 
        axios.defaults.headers.Cookie = cookie;
      }

    context.store.dispatch({
      type:LOAD_USER_REQUEST
    });

    context.store.dispatch({
        type:INDEX_PAGE_DATA_1001_REQUEST, 
        data:{postFlag:'1001',}, 
        });
        
  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 
});

export default MainPage; 