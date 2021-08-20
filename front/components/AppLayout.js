
import {useCallback,useState, useRef} from 'react'
import {Row,Col,Drawer,Menu,} from  'antd'; 
import {AlignLeftOutlined,UserOutlined } from '@ant-design/icons'


import Router from 'next/router'; 
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';


//import wrapper from '../store/configureStore';
import { backImageUrl } from '../config/config';


const AppLayOut = ({children}) =>{
    //const dummyList = ['자유 게시판','유머','정보','취업','핫딜','미국','일본','중국','동남아','유럽','호주','기타']; 
    const { SubMenu } = Menu;
    //const router   =useRouter(); 
    //const dispatch = useDispatch(); 
    const {userInfo, joined} = useSelector((state)=>state.auth); 
    const {posf} = useSelector((state)=>state.mainPosts_1001); 


    // useEffect(()=>{
    //     //로그 아웃 후 메인 페이지로 이동
    //     if(!userInfo){
    //         Router.push('/'); 

    //     }

    // },[userInfo]);

    //로그아웃 버튼
    // const logOut = useCallback((e)=>{

    //     dispatch({
    //         type:LOGOUT_REQUEST, 
    //     });

    // },[userInfo]); 
 
    const [isClicked,setIsClicked] = useState(false); 
    //const inputEl = useRef(null); 
  

    // const catergoriList = () =>{
    //       setIsClicked(!isClicked);
    // }

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };




    // const closeCatergoriList = () =>{
    //     setIsClicked(false);
    // }

    const gotoHome = () =>{
        Router.push('/'); 
    }

    const goProfile = () =>{
        Router.push('/posts/profile'); 
        return; 
    }
    

    
    return(

        <Row>
        <Col xs={24} md={6}>
        </Col>
    

        <Col  xs={24} md={12}>
 
    
        <header className="hd">
        <h1 className="h1">
        {/* <AlignLeftOutlined onClick={showDrawer}/>*/}&nbsp;<img src={`${backImageUrl}/koielogo.jpg`} style={{width:"111",height:"28",justifyContent:"left"}} onClick={gotoHome}></img>
	    </h1>

        <div className="fr" style={{marginRight:"-5px"}}>
        
        {!userInfo ?    <Link href={'/auth/login'} ><a className="mu">로그인</a></Link> :'' }
        {!userInfo ?    <Link href={'/auth/join'} ><a className="mu">회원가입</a></Link>:<Link  href={'/posts/profile'}><a className="mu"><UserOutlined onClick={goProfile}/> 내 정보</a></Link> } 

        </div>
  
        </header>

        <nav className='navInfo'>
       <Link href={{pathname:'#' }}><a style={{backgroundColor:posf==='1000'?'#4CAF50':''}}>좋소!베스트</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1001'}} }><a style={{backgroundColor:posf==='1001'?'#4CAF50':''}}>좋좋소!</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1002'}} }><a style={{backgroundColor:posf==='1002'?'#4CAF50':''}}>좋소!</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1003'}} }><a style={{backgroundColor:posf==='1003'?'#4CAF50':''}}>좋소!탈출</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1004'}} }><a style={{backgroundColor:posf==='1004'?'#4CAF50':''}}>좋소!희망편</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1005'}} }><a style={{backgroundColor:posf==='1005'?'#4CAF50':''}}>주말출근</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1006'}} }><a style={{backgroundColor:posf==='1006'?'#4CAF50':''}}>야근/철야</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1007'}} }><a style={{backgroundColor:posf==='1007'?'#4CAF50':''}}>현장/이슈</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1008'}} }><a style={{backgroundColor:posf==='1008'?'#4CAF50':''}}>거래처썰</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1009'}} }><a style={{backgroundColor:posf==='1009'?'#4CAF50':''}}>추노</a></Link>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1010'}} }><a style={{backgroundColor:posf==='1010'?'#4CAF50':''}}>핫딜/광고</a></Link> 
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1011'}} }><a  style={{backgroundColor:posf==='1011'?'#4CAF50':''}}>운영진 요청사항</a></Link>
       </nav>
            
 
     
    {/* 
    <div className="sidenav" style={{width : isClicked? "40%":"0"}}>
       <a className="closebtn" onClick={closeCatergoriList}>x</a>
       {dummyList.map((v,i)=>(      
        <Link href={'/about'} key={i}>
            <a onClick={closeCatergoriList} >{v}</a>
        </Link>
       ))}
    </div>   
    */}     
    
    

        {/*  
            https://ant.design/components/drawer/
        */}
        <Drawer
        title="koie"
        placement="left"
        mask={false}
        onClose={onClose}
        visible={visible}
        width={'40%'}
    >

        <Menu

        style={{width:400,marginLeft:-30}}
        defaultOpenKeys={['sub1']}
        mode="inline"
        >
        <Menu.Item key="1" >자유 게시판</Menu.Item>
        <Menu.Item key="2" >유머</Menu.Item>
        <hr style={{opacity:'0.3'}}/>

        <Menu.Item key="3" >정보</Menu.Item>
        <Menu.Item key="4" >취업</Menu.Item>
        <Menu.Item key="5" >핫딜</Menu.Item>
        <hr style={{opacity:'0.3'}}/>
        <SubMenu key="sub2" title="국가(country)">
        <Menu.Item key="sub2_1">미국</Menu.Item>
        <Menu.Item key="sub2_2">중국</Menu.Item>
        <Menu.Item key="sub2_3">일본</Menu.Item>
        <Menu.Item key="sub2_4">동남아</Menu.Item>
        <Menu.Item key="sub2_5">유럽</Menu.Item>
        <Menu.Item key="sub2_6">호주</Menu.Item>
        <Menu.Item key="sub2_7">기타</Menu.Item>
        </SubMenu>
        </Menu>

    </Drawer>


    {children}


    <footer>
        <div className="footerSub" />
        <div className="footer">
            <b>좋소? 좋좋소!</b>
            <br/>
            <Link href={`/posts/detailPage?postId=10000001&userNickName=${decodeURIComponent('운영자')}&postFlag=1011&submitDay=20210810&who=${userInfo}`}><a>운영목적 | </a></Link>
            <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1,posf:'1011'}}}><a>운영진 요청사항 | </a></Link>
            <Link href={`/posts/detailPage?postId=10000002&userNickName=${decodeURIComponent('운영자')}&postFlag=1011&submitDay=20210810&who=${userInfo}`}><a>후원하기</a></Link>
            <br/>
            좋소(jscompany)2021 ~ © All Rights Reserved.
        </div>
    </footer>
    </Col>

    
    {/*
   
    */}

    <Col xs={24} md={6}>
    </Col>

  
    </Row> 
     
        ); 

}

export default AppLayOut; 