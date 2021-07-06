const express = require('express');
const pool = require('../DataBaseInfo');
const router = express.Router();


router.post('/data01', async (req,res,next)=>{

        try{

            const {postFlag} =req.body.data; 
        
            let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
                stringQuery = stringQuery.concat(`('${postFlag}')`);
        
            const indexPageData01 = await pool.query(stringQuery); 
            console.log(stringQuery); 
            return res.json(indexPageData01[0]); 

        }catch(e){
            console.log(e); 
            next(e); 
        }

}); 

module.exports  = router; 
