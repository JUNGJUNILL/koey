const express = require('express');
const passport = require('passport');
const {isLoggedIn , vertifiyToken} = require('./middlewares'); 
const sharp = require('sharp');
const bcrypt = require('bcryptjs');
const pool = require('../DataBaseInfo');
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const multer =require('multer'); 
const path   =require('path');
const fs = require('fs'); 

const multerS3 = require('multer-s3'); 
const AWS = require('aws-sdk'); 

AWS.config.update({
    accessKeyId:process.env.AWSAccessKeyId,
    secretAccessKey:process.env.AWSSecretKey,
    region:'ap-northeast-2'
}); 

//AWS용 
const upload = multer({
    storage: multerS3({
        s3:new AWS.S3(),
        bucket:'jscompany-s3',
        key(req,file,cb){
            const postFlag= req.query.postFlag;
            const user= decodeURIComponent(req.query.user);
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
            cb(null,`images/${postFlag}/${basename+'_'+ new Date().valueOf()+'_'+user+ext}`)
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, //20MB
  });

  const upload_local = multer({
    storage: multer.diskStorage({
    destination(req, file, done) {
        
    const postFlag= req.query.postFlag;
      
    fs.readdir(`images/${postFlag}`,(error,files)=>{
        if(error){
            fs.mkdirSync(`images/${postFlag}`); 
        }
    }); 
     done(null, `images/${postFlag}`);
     //done(null,'uploads'); 
    },
    filename(req, file, done) {
      const user= decodeURIComponent(req.query.user);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
      done(null, basename+'_'+ new Date().valueOf()+'_'+user+ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB
});




  router.post('/images',process.env.NODE_ENV === 'production' ? 
                        upload.array('image') 
                        :
                        upload_local.array('image'),(req,res)=>{
     
    return  process.env.NODE_ENV === 'production' ? 
    res.json(req.files.map(v=>v.location))
    :
    res.json(req.files.map(v=>v.filename))
    
  }); 




//게시글 SELECT
router.post('/', async (req,res,next)=>{

    try{    
        const {postFlag, currentPage, maxPage,pageNumber,searchCondition,searchValue}= req.body.data;   

        let mainPost_1001_Popular_list;
        let stringQuery;
        let mainPosts_1001_List;
        if(pageNumber === 1){

            stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
            stringQuery =stringQuery.concat(`('${postFlag}')`);
            mainPost_1001_Popular_list =  await pool.query(stringQuery); 
            console.log(stringQuery); 
        }
            stringQuery=''; 
            stringQuery = 'CALL US_SELECT_mainPosts'; 
            stringQuery =stringQuery.concat(`('${postFlag}',`);
            stringQuery =stringQuery.concat(`${currentPage},`);
            stringQuery =stringQuery.concat(`${maxPage},`); 
            stringQuery =stringQuery.concat(`'${searchCondition}',`); 
            stringQuery =stringQuery.concat(`'${decodeURIComponent(searchValue)}')`);
            console.log(stringQuery); 
            mainPosts_1001_List = await pool.query(stringQuery); 
            
        if(pageNumber === 1 && mainPost_1001_Popular_list[0].length > 0 ){
            const concatPopularArray = mainPost_1001_Popular_list[0].concat(mainPosts_1001_List[0]); 
            return res.json(concatPopularArray); 

        }else{
         
            return res.json(mainPosts_1001_List[0]); 

        }

       

 
      

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 


//게시글 상세정보 
router.post('/mainPosts_1001Detail', async (req,res,next)=>{

    try{    
        const {postId, pid,  postFlag, who, submitDay}= req.body.data; 

        //(쿠키가 없는 경우 게시글 정보로 쿠키생성)
        if(!req.cookies[process.env.HITCOUNT_COOKIE] || req.cookies[process.env.HITCOUNT_COOKIE] !== postId+decodeURIComponent(pid)+postFlag+submitDay){

            let rowQuery ='CALL US_UPDATE_mainPostsHit'; 
            rowQuery =rowQuery.concat(`('${postId}',`);
            rowQuery =rowQuery.concat(`'${decodeURIComponent(pid)}',`);
            rowQuery =rowQuery.concat(`'${postFlag}',`); 
            rowQuery =rowQuery.concat(`'${submitDay}')`);
            console.log(rowQuery); 
            await pool.query(rowQuery); 
         
            res.cookie(process.env.HITCOUNT_COOKIE,postId+decodeURIComponent(pid)+postFlag+submitDay,
                {httpOnly:true,
                secure:false,
                domain: process.env.NODE_ENV === 'production' && '.jscompany.live'

            }); 

        }


        let stringQuery = 'CALL US_SELECT_mainPostsDetail'; 
            stringQuery =stringQuery.concat(`('${postId}',`);
            stringQuery =stringQuery.concat(`'${decodeURIComponent(pid)}',`); 
            stringQuery =stringQuery.concat(`'${postFlag}',`);
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`);

        const mainPosts_1001Detail = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001Detail[0]); 
      

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 



//게시글 이미지 이름 가져오기
router.post('/imagename', async (req,res,next)=>{
    try{

        const {postId, pid, submitDay, postFlag,}= req.body.data; 
        
        let stringQuery = 'CALL US_SELECT_mainPostImages'; 
            stringQuery =stringQuery.concat(`('${postId}',`);
            stringQuery =stringQuery.concat(`'${decodeURIComponent(pid)}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}',`);
            stringQuery =stringQuery.concat(`'${postFlag}')`);

        const mainPosts_1001ImageName = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001ImageName[0]); 

    }catch(e){
        console.log(e); 
        next(e);
    }
});


//게시글 댓글 리스트 
router.post('/mainPosts_1001Comments', async (req,res,next)=>{


    try{

        const {postId, nickName, postFlag, who, submitDay, pid}= req.body.data; 
        

        let stringQuery = 'CALL US_SELECT_mainPostComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${decodeURIComponent(nickName)}',`);
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}',`); 
        stringQuery =stringQuery.concat(`'${pid}')`);

        const mainPosts_1001Comments = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001Comments[0]); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 


//게시글 INSERT 
router.post('/postInsert', async (req,res,next)=>{

    try{
        let {content,title,userNickName,postFlag,contentImages,imageFileName,userid} = req.body.data; 

        const _title   = decodeURIComponent(title); 
        const _content = decodeURIComponent(content); 
        const _contentImages = decodeURIComponent(contentImages); 
        const _userNickName   = decodeURIComponent(userNickName); 
        const _postFlag = postFlag; 
        const _userid   =decodeURIComponent(userid); 
      
        let stringQuery;
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPosts'; 
            stringQuery =stringQuery.concat(`('${_title}',`);
            stringQuery =stringQuery.concat(`'${_content}',`); 
            stringQuery =stringQuery.concat(`'${_contentImages}',`); 
            stringQuery =stringQuery.concat(`'${_userNickName}',`); 
            stringQuery =stringQuery.concat(`'${_postFlag}',`); 
            stringQuery =stringQuery.concat(`'${_userid}')`);
            
  
      
        const postInsert = await pool.query(stringQuery); 

        if(imageFileName.length > 0){
        
                stringQuery=''; 
                for(let i=0; i<imageFileName.length; i++){
                    stringQuery = 'CALL US_INSERT_mainPostImages'; 
                    stringQuery =stringQuery.concat(`('${postInsert[0][0].postId}',`);
                    stringQuery =stringQuery.concat(`'${_userid}',`); 
                    stringQuery =stringQuery.concat(`'${postInsert[0][0].submitDay}',`); 
                    stringQuery =stringQuery.concat(`'${imageFileName[i].split('/')[imageFileName[i].split('/').length-1]}',`); 
                    stringQuery =stringQuery.concat(`'${_postFlag}');`);
                    console.log(stringQuery);
                    await pool.query(stringQuery);
                }

                //무슨 이유에서인지는 모르지만 map이 기존 배열갯수 +1개를 반환해서 문제가 발생해서
                //어쩔 수 없이 for문을 이용함.. 
                // await Promise.all( imageFileName.map((imageName)=>{
                //     stringQuery = 'CALL US_INSERT_mainPostImages'; 
                //     stringQuery =stringQuery.concat(`('${postInsert[0][0].postId}',`);
                //     stringQuery =stringQuery.concat(`'${_userNickName}',`); 
                //     stringQuery =stringQuery.concat(`'${postInsert[0][0].submitDay}',`); 
                //     stringQuery =stringQuery.concat(`'${imageName}',`); 
                //     stringQuery =stringQuery.concat(`'${_postFlag}');`);
                //     console.log(stringQuery);
                //     pool.query(stringQuery)
                // }));
              
        }

        console.log(stringQuery); 
        return res.status(200).json(postInsert[0]); 
  
  
    }catch(e){
        console.log(e); 
        next(e); 
    }
  }); 



//게시글 댓글 INSERT
router.post('/mainPosts_1001CommentInsert', async (req,res,next)=>{


    try{

        const { postId,
                postFlag,
                pid,
                nickName,
                who,
                comment,
                submitDay,}= req.body.data; 
        

        let stringQuery = 'CALL US_INSERT_mainPostsComments'; 
        stringQuery =stringQuery.concat(`('${postId}',`);
        stringQuery =stringQuery.concat(`'${postFlag}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${comment}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}',`); 
        stringQuery =stringQuery.concat(`'${pid}')`);
        await pool.query(stringQuery); 
    
        stringQuery=''; 
        stringQuery = 'CALL US_SELECT_mainPostComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}',`); 
        stringQuery =stringQuery.concat(`'${pid}')`);


        const mainPosts_1001CommentInsert = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001CommentInsert[0]); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 
+
//게시글 대댓글 INSERT
router.post('/mainPosts_1001CommentByCommentInsert', async (req,res,next)=>{


    try{

        const { postFlag,
                pid,
                nickName,
                postId,
                commentId,
                who,
                comment,
                submitDay,
                }= req.body.data; 
        

        let stringQuery = 'CALL US_INSERT_mainPostsCommentByComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${commentId}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${comment}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}',`); 
        stringQuery =stringQuery.concat(`'${pid}')`);
        await pool.query(stringQuery); 
        console.log(stringQuery); 
    
        stringQuery=''; 
        stringQuery = 'CALL US_SELECT_mainPostCommentByComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${commentId}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}',`); 
        stringQuery =stringQuery.concat(`'${pid}')`);



        const mainPosts_1001CommentByCommentInsert = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001CommentByCommentInsert[0]); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 



//게시글 LIKE / DISLIKE 
router.post('/mainPosts_1001Like', async (req,res,next)=>{

    try{
        const {
                postId,
                pid,
                postFlag,
                who,
                flag,
                submitDay,} = req.body.data; 
        
        
        let stringQuery = 'CALL US_SELECT_mainPostLikeDislike'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${pid}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        console.log(stringQuery); 
        const mainPosts_1001LikeDislike = await pool.query(stringQuery); 
        
        if(mainPosts_1001LikeDislike[0][0].flag=== "N"){
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPostsLikeDislike'
            stringQuery =stringQuery.concat(`('${postId}',`);
            stringQuery =stringQuery.concat(`'${pid}',`); 
            stringQuery =stringQuery.concat(`'${postFlag}',`); 
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${flag}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`);
            console.log(stringQuery);
            await pool.query(stringQuery); 
    
        }

        
        console.log(stringQuery); 
        return res.json(postId); 

    }catch(e){
        console.log(e); 
        next(e); 

    }

}); 


//게시글 댓글 LIKE / DISLIKE 
router.post('/mainPosts_1001CommentLike', async (req,res,next)=>{

    try{

        const { 
                commentid, 
                postFlag,
                postId,
                flag,
                who,
                pid,
                submitDay,
                }= req.body.data; 

        let stringQuery = 'CALL US_SELECT_mainPostCommentsLikeDislike '; 
        stringQuery =stringQuery.concat(`('${commentid}',`);
        stringQuery =stringQuery.concat(`'${postFlag}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${pid}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        console.log(stringQuery); 
        const mainPosts_1001CommentLike = await pool.query(stringQuery); 

        if(mainPosts_1001CommentLike[0][0].flag=== "N"){
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPostCommentsLikeDislike ';
            stringQuery =stringQuery.concat(`('${commentid}',`);
            stringQuery =stringQuery.concat(`'${postFlag}',`); 
            stringQuery =stringQuery.concat(`'${postId}',`); 
            stringQuery =stringQuery.concat(`'${pid}',`); 
            stringQuery =stringQuery.concat(`'${flag}',`); 
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`)
            await pool.query(stringQuery); 
        }


        console.log(stringQuery); 
        return res.json(commentid); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 


//게시글 대댓글 리스트
router.post('/mainPosts_1001CommentByComments', async (req,res,next)=>{

        try{

            const {

                postFlag,
                pid,
                nickName,
                postId,
                commentId,
                who,
                submitDay,
            } = req.body.data; 

            let stringQuery = 'CALL US_SELECT_mainPostCommentByComments '; 
            stringQuery =stringQuery.concat(`('${postFlag}',`);
            stringQuery =stringQuery.concat(`'${nickName}',`); 
            stringQuery =stringQuery.concat(`'${postId}',`); 
            stringQuery =stringQuery.concat(`'${commentId}',`); 
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}',`); 
            stringQuery =stringQuery.concat(`'${pid}')`);


            const mainPosts_1001CommentByComment = await pool.query(stringQuery); 
            console.log(stringQuery); 
            return res.json(mainPosts_1001CommentByComment[0]); 
            
        }catch(e){
            console.log(e); 
            next(e); 
        }

}); 




//게시글 대댓글 LIKE / DISLIKE 
router.post('/mainPosts_1001CommentByCommentsLike', async (req,res,next)=>{


    try{

        const { 
                byCommentId,
                commentId, 
                postId,
                postFlag,
                pid,
                nickName,
                who,
                flag,   
                submitDay  }= req.body.data; 

        let stringQuery = 'CALL US_SELECT_mainPostCommentByCommentsLikeDislike '; 
        stringQuery =stringQuery.concat(`('${byCommentId}',`);
        stringQuery =stringQuery.concat(`'${commentId}',`); 
        stringQuery =stringQuery.concat(`'${postFlag}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${pid}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        console.log(stringQuery); 
        const mainPosts_1001CommentByCommentsLike = await pool.query(stringQuery); 
        if(mainPosts_1001CommentByCommentsLike[0][0].flag=== "N"){
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPostCommentByCommentsLikeDislike ';
            stringQuery =stringQuery.concat(`('${byCommentId}',`);
            stringQuery =stringQuery.concat(`'${commentId}',`); 
            stringQuery =stringQuery.concat(`'${postId}',`); 
            stringQuery =stringQuery.concat(`'${postFlag}',`); 
            stringQuery =stringQuery.concat(`'${pid}',`); 
            stringQuery =stringQuery.concat(`'${who}',`);
            stringQuery =stringQuery.concat(`'${flag}',`);
            stringQuery =stringQuery.concat(`'${submitDay}')`);
            console.log(stringQuery);
            await pool.query(stringQuery); 
        }

        return res.json(byCommentId); 

    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 






module.exports  = router; 