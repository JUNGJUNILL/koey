const serverless = require('serverless-http');
const express = require('express');
const app = express();

const got = require('got'); 
const sharp = require('sharp');
const path   =require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/helloWorld/imageResize-lambda', async (req, res) => {

   let {size} =req.query;
   let url ='https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_1600,c_limit/phonepicutres-TA.jpg';
   const array = url.split('.');
   const ext = array[array.length-1]; 
   const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
   const bufferImage=await got(url).buffer();

   if(size){
   size = size.split('x');
   //res.end(`hello express!!!!,${size[0]},${size[1]}`);
	
         res.end(
		         await sharp(bufferImage)
		         .resize(parseInt(size[0]), parseInt(size[1]),{ fit: 'inside' })
		         .toFile(`hello.${requiredFormat}`)
             .toBuffer());

   }else{
   res.end('hello express!!!!');
   }

});

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);
