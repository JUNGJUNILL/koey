
import {useCallback,useState,useEffect, useRef} from 'react'
import {Row,Col,Drawer,Menu,Button,Layout} from  'antd'; 
import {AlignLeftOutlined,UserOutlined } from '@ant-design/icons'


import Router from 'next/router'; 
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';


import wrapper from '../store/configureStore';
import { backImageUrl } from '../config/config';


const AppLayOut = ({children}) =>{
    const dummyList = ['자유 게시판','유머','정보','취업','핫딜','미국','일본','중국','동남아','유럽','호주','기타']; 
    const { SubMenu } = Menu;
    //const router   =useRouter(); 
    const dispatch = useDispatch(); 
    const {userInfo, joined} = useSelector((state)=>state.auth); 

    useEffect(()=>{
        //로그 아웃 후 메인 페이지로 이동
        if(!userInfo){
            Router.push('/'); 

        }

    },[userInfo]);

    //로그아웃 버튼
    const logOut = useCallback((e)=>{

        dispatch({
            type:LOGOUT_REQUEST, 
        });

    },[userInfo]); 
 
    const [isClicked,setIsClicked] = useState(false); 
    const inputEl = useRef(null); 
  

    const catergoriList = () =>{
          setIsClicked(!isClicked);
    }

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };




    const closeCatergoriList = () =>{
        setIsClicked(false);
    }

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
        <AlignLeftOutlined onClick={showDrawer}/>&nbsp;<img src={`${backImageUrl}/koielogo.jpg`} style={{width:"111",height:"28",justifyContent:"left"}} onClick={gotoHome}></img>
	    </h1>

        <div className="fr" style={{marginRight:"-5px"}}>
        
        {!userInfo ?    <Link href={'/auth/login'} ><a className="mu">로그인</a></Link> :'' }
        {!userInfo ?    <Link href={'/auth/join'} ><a className="mu">회원가입</a></Link>:<Link  href={'/posts/profile'}><a className="mu"><UserOutlined onClick={goProfile}/> 내 정보</a></Link> } 

        </div>
  
        </header>
        
        {/* 
        <ul className="navulSub">
        <li className="navli" onClick={showDrawer}><UnorderedListOutlined /></li>  
        <li className="navli"><Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1}}} ><a>메인1001</a></Link></li>
        <li className="navli"><Link href={{pathname:'/posts/postEdit'}} ><a>글쓰기</a></Link></li>
        </ul>
       */}
       <nav className='navInfo'>
       <Link href={{pathname:'/posts/mainPosts_1001',query:{nowPage:1}}} ><a>자유 게시판</a></Link>
       <Link href={{pathname:''}}><a>유머</a></Link>
       <Link href={{pathname:''}}><a>정보</a></Link>
       <Link href={{pathname:''}}><a>취업</a></Link>
       <Link href={{pathname:''}}><a>핫딜</a></Link>
       <Link href={{pathname:''}}><a>미국</a></Link>
       <Link href={{pathname:''}}><a>중국</a></Link>
       <Link href={{pathname:''}}><a>일본</a></Link>
       <Link href={{pathname:''}}><a>동남아</a></Link>
       <Link href={{pathname:''}}><a>유럽</a></Link>
       <Link href={{pathname:''}}><a>아프리카</a></Link>
       <Link href={{pathname:''}}><a>오세아니아</a></Link>

       <a>핫딜</a>
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
        <div className="footerSub"></div>
        <div className="footer">푸터입니다.</div>
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