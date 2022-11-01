import { backImageUrl,AWSImageUrl,backUrl } from '../../config/config';
import {Button} from 'antd'

import {CloseOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux';


const ImageUploadComponentToastUI = ({postFlag,updateFlag,imageFileName,removeImage,removeImageName,checkPreviewOption,insertImage,preview}) =>{
    const posf = postFlag;
    const updateflag = updateFlag?updateFlag:'';
    const imagefilename = imageFileName; 
    return(

         <div style={{textAlign:'center'}}>
            {/* 게시글 수정 시 --일단 안나오게 하는게 맞지 않을까??      
                    {updateflag==='update' && imageSrc && imageSrc.map((v,i)=>(
                        <div style={{display:'inline-block'}} key={i} >
                        <img style={{width:'60px',height:'60px'}} src={process.env.NODE_ENV==='production' 
                                                                    ?                                                                   
                                                                    //원본 이미지
                                                                    `${AWSImageUrl}/images/${posf}/${v.src.split('/')[v.src.split('/').length-1]}`
                                                                    
                                                                    //이미지 리사이즈
                                                                    //`${backUrl}/imgResizing?size=60x60&posf=${posf}&fileName=${AWSImageUrl}/images/${posf}/${v.split('/')[v.split('/').length-1]}` 
                                                                    : 
                                                                    //이미지 리사이즈
                                                                    //`${backUrl}/imgResizing?size=60x60&posf=${posf}&fileName=${backImageUrl}/${posf}/${v}`} /> 
                                                                    `${backImageUrl}/${posf}/${v.src}`  } />
                        <br/>
                        
                        <Button style={{width:'60px'}}><CloseOutlined onClick={()=>removeImage(v.src,
                                                                                            posf,
                                                                                            v.imageId,
                                                                                            v.postId,
                                                                                            v.userId,
                                                                                            v.submitDay,
                                                                                            v.update)} /></Button>
                        

                    </div>
                    ))}
            */}
            {/* 게시글 작성 시*/}
            {updateflag!=='update'&& imagefilename && imagefilename.map((v,i)=>(
            <div style={{display:'inline-block'}} onClick={()=>insertImage(v)} key={i} >&nbsp;
                 {/*<Button type='primary' style={{width:'60px'}} onClick={()=>insertImage(v)}>삽입</Button>*/}
                 <br/>
                <img style={{width:'60px',height:'60px'}} src={process.env.NODE_ENV==='production' 
                                                            ?                                                                   
                                                            //원본 이미지
                                                            `${AWSImageUrl}/images/${posf}/${v.split('/')[v.split('/').length-1]}`
                                                            
                                                            //이미지 리사이즈
                                                            //`${backUrl}/imgResizing?size=60x60&posf=${posf}&fileName=${AWSImageUrl}/images/${posf}/${v.split('/')[v.split('/').length-1]}` 
                                                            : 
                                                            //이미지 리사이즈
                                                            //`${backUrl}/imgResizing?size=60x60&posf=${posf}&fileName=${backImageUrl}/${posf}/${v}`} /> 
                                                            `${backImageUrl}/${posf}/${v.split('/')[v.split('/').length-1]}`  } />

                <br/>
                 {/*<Button type='danger' style={{width:'60px'}} onClick={()=>removeImageName(v)}>삭제</Button>*/}
            </div>
        ))}
        <br />
        {(updateflag!=='update' && imagefilename.length!==0) && 
            <div style={{display:'inline-block'}} >
                <div style={{marginTop:'2%',textAlign:'center'}}>
                    <input type="checkbox" value={preview} onChange={()=>checkPreviewOption()} /> 미리보기 방지
                </div> 
            </div> 
        }

        </div>
    )
}

export default ImageUploadComponentToastUI; 