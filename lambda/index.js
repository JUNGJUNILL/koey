const serverless = require('serverless-http');
const express = require('express');
const app = express();

const got = require('got'); 
const sharp = require('sharp');
const path   =require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/imageResize-lambda', (req, res) => {

  const {url,size}=req.query; 
  const bufferImage=await got(url).buffer();
  const imageDir = path.join(__dirname,'../backend','../images');
  const filename =  path.join(imageDir,'noimages.gif'); 
  console.log('imageDir==>',imageDir,'filename==>',filename); 

  if(size) {
    size = size.split('x');
    return res.status(200).end(
        
        await sharp(bufferImage).resize(
            {width:parseInt(size[0]), 
            height:parseInt(size[1]), 
            position:'top',

        }).toBuffer());

  } else {

      return  res.status(200).end(fs.readFileSync(filename));

  }


});

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);