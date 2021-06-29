const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const path   =require('path');
const fs = require('fs'); 



router.get('/' ,async (req,res,next)=>{


    //https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=gmlwo308&logNo=222051126736
    //https://sharp.pixelplumbing.com/    
    let {size , flag,uflag, fileName} = req.query;
    const imageDir = path.join(__dirname,'../images',flag,uflag); 
    const filename =  path.join(imageDir,decodeURIComponent(fileName)); 

    if(size) {
        size = size.split('x');
        return res.status(200).end(
            
            await sharp(filename).resize(
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