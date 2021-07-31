const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const path   =require('path');
const fs = require('fs'); 
const got = require('got'); 



router.get('/' ,async (req,res,next)=>{


    //https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=gmlwo308&logNo=222051126736
    //https://sharp.pixelplumbing.com/    
    let {size , posf, fileName} = req.query;
    const imageDir = path.join(__dirname,'../images',posf); 
    const filename =  path.join(imageDir,decodeURIComponent(fileName)); 
    console.log('filename==>',filename);

    //외부 이미지를 resize 할 경우
    const buf=await got('https://jscompany-s3.s3.ap-northeast-2.amazonaws.com/images/1001/Cheer_5738754_11681_photo1_org_1627545039491_1111.jpg')
                    .buffer();
    //D:\git Repository\koey\backend\images\1001\1일_1625652527838_계란빵.jpg
    if(size) {
        size = size.split('x');
        return res.status(200).end(
            
            await sharp(buf).resize(
                {width:parseInt(size[0]), 
                height:parseInt(size[1]), 
                position:'top',
     
            }).toBuffer());
    } else {
        return  res.status(200).end(fs.readFileSync(filename));
    }

    //return res.json('gamjaggang1'); 
  }); 


  
module.exports  = router; 