const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/helloWorld/imageResize-lambda', (req, res) => {
  res.send('hello express');
});

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);
