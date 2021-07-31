const serverless = require('serverless-http');
const express = require('express');
const app = express();

const got = require('got'); 
const sharp = require('sharp');
const path   =require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/helloWorld/imageResize-lambda', async (req, res) => {


   res.end('hello express!!!!');


});

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);
