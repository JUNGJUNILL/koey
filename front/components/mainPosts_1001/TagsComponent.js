import { useState, useCallback,createRef } from 'react';

import {Button, Input,} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import 
{
    MAINPOSTS_INSERT_TAGS,
    MAINPOSTS_DELETE_TAGS
} 
from '../../reducers/mainPosts_1001';



const TagsComponent =() =>{

    const dispatch = useDispatch(); 
    const {tags} = useSelector((state)=>state.mainPosts_1001); 
    const blank_pattern = /^\s+|\s+&/g; 

    const [tagValue,setTagValue] =useState(''); 
    const insertTag = createRef(); 

    const onChangeTagValue=useCallback((e)=>{
        setTagValue(e.target.value); 
    },[tagValue])

    const isertTags =useCallback((e)=>{
        let val = e.target.value.replace(',','');
        let count=0; 

        if(e.key==='Enter' || e.key===','){

            if(val.length === 0 || val.replace(blank_pattern,'')===""){
                alert('공백은 입력 할 수 없습니다.');
                return;
            }

            if(tags.length > 9){
                alert('태그는 10개까지 입력 가능합니다.');
                return;
            }

            tags.map((v,i)=>{
                if(v === val){
                    alert('이미 등록된 태그입니다.'); 
                    count++; 
                    setTagValue(''); 
                    return;  
                }
            }); 

            if(count===0){
                dispatch({
                    type:MAINPOSTS_INSERT_TAGS,
                    data:{
                        tagsValue:val, 
                    }
                }); 
            }
   
            setTagValue(''); 
           
        }
    },[tags,tagValue]); 

    const removeTag = (v) =>{
        dispatch({type:MAINPOSTS_DELETE_TAGS, 
                  data:{
                    tagsValue:v, 
                  }     
        });
    }

    return (
        <>
        <Input placeholder='태그 입력 (쉼표(,)나 엔터 키로 분리)' value={tagValue} ref={insertTag} style={{marginTop:'1%',marginBottom:'1%'}} onChange={onChangeTagValue} onKeyUp={isertTags}/>
        {tags.map((v,i)=>(
           <div style={{display:'inline-block'}}><Button size='small' onClick={()=>removeTag(v)}>#{v}&nbsp;<b>x</b></Button>&nbsp;</div>
        ))} 
        </>
    )

}
export default TagsComponent; 