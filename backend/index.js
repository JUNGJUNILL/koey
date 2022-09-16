const express = require('express'); 
const cors = require('cors'); 
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session');
const path = require('path'); 
const hpp = require('hpp');
const helmet = require('helmet');


const dotenv = require('dotenv');
const passportConfig = require('./passport'); 
const app= express(); 

dotenv.config(); 
passportConfig(); 


if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(cors({
      //origin: ['http://jscompany.live','http://www.jscompany.live'],
      origin: true,
      credentials: true,
        //--프론트와 백엔드간에 쿠키 주고 받기 위함
    }));
  } else {
    app.use(morgan('dev'));
    app.use(cors({
      origin: true,
      credentials: true,
    }));
  }



const authAPIRouter = require('./routes/auth'); 
const mainPosts_1001APIRouter = require('./routes/mainPosts_1001'); 
const imgResizingAPIRouter = require('./routes/imgResizing'); 
const indexPageAPIRouter = require('./routes/indexPage'); 

app.use(morgan('dev')); 

//정적 파일 load
app.use('/',express.static(path.join(__dirname,'images'))); 
app.use('/',express.static('uploads')); 

app.use(express.json()); 
app.use(express.urlencoded({extended : true})); //form 데이터 처리 

app.use(cookieParser()); //req.cookies 사용가능, 


// app.use(session({
//     resave : false,             //매번 세션 강제 저장
//     saveUninitialized : false,  //빈 값도 저장
//     secret: process.env.COOKIE_SECRET, 
//     cookie :{
//         httpOnly : true, 
//         secure: false, //https 시 true
//         domain: process.env.NODE_ENV === 'production' && '.jscompany.live'
//       //  maxAge : 1000*60*60,
//     },
//    // name:'rnbck',

// }));
// app.use(passport.initialize()); 
// app.use(passport.session()); 


app.use('/api/auth',authAPIRouter); 
app.use('/api/mainPosts_1001',mainPosts_1001APIRouter); 
app.use('/api/imgResizing',imgResizingAPIRouter);
app.use('/api/indexPage',indexPageAPIRouter); 



//에러
// app.use(function(e, req, res, next) {
//     console.log('에러발생했어!!', e); 
//   });
app.get('/', (req,res)=>{

res.end('hello yabal');

}); 

app.listen(3333,()=>{
    console.log('server is Runnig in 3333 port'); 
})