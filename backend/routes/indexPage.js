const express = require('express');
const pool = require('../DataBaseInfo');
const router = express.Router();


router.post('/data1001', async (req,res,next)=>{

        try{

            const {postFlag} =req.body.data; 
        
            let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
                stringQuery = stringQuery.concat(`('${postFlag}')`);
        
            const indexPageData_1001 = await pool.query(stringQuery); 
            console.log(stringQuery); 
            return res.json(indexPageData_1001[0]); 

        }catch(e){
            console.log(e); 
            next(e); 
        }

}); 


router.post('/data1002', async (req,res,next)=>{

    try{

        const {postFlag} =req.body.data; 
    
        let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
            stringQuery = stringQuery.concat(`('${postFlag}')`);
    
        const indexPageData_1002 = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(indexPageData_1002[0]); 

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 



router.post('/data1003', async (req,res,next)=>{

    try{

        const {postFlag} =req.body.data; 
    
        let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
            stringQuery = stringQuery.concat(`('${postFlag}')`);
    
        const indexPageData_1003 = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(indexPageData_1003[0]); 

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 


router.post('/data1004', async (req,res,next)=>{

    try{

        const {postFlag} =req.body.data; 
    
        let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
            stringQuery = stringQuery.concat(`('${postFlag}')`);
    
        const indexPageData_1004 = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(indexPageData_1004[0]); 

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 



router.post('/data1005', async (req,res,next)=>{

    try{

        const {postFlag} =req.body.data; 
    
        let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
            stringQuery = stringQuery.concat(`('${postFlag}')`);
    
        const indexPageData_1005 = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(indexPageData_1005[0]); 

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 



router.post('/data1006', async (req,res,next)=>{

    try{

        const {postFlag} =req.body.data; 
    
        let stringQuery = 'CALL US_SELECT_mainPostsPopular'; 
            stringQuery = stringQuery.concat(`('${postFlag}')`);
    
        const indexPageData_1006 = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(indexPageData_1006[0]); 

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 


module.exports  = router; 
