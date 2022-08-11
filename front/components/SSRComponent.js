import React, { useCallback,useEffect, useState, createRef } from 'react'
import wrapper from '../store/configureStore';
import Head from "next/head";


const SSRComponent =({hello})=>{


    return(
        <div>
   
      
            <pre>
            <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta property="og:url" content="http://www.jscompany.live"></meta>
                    <meta property="og:image" content='https://www.hubpass.co.kr/external/images/a1001/jsMetaImage.gif'></meta>
                    <meta property="og:image:width" content="80"></meta>
                    <meta property="og:image:height" content="60"></meta>
                    <meta property="og:title" content={'좋소! 썰'} />
                    <meta property="og:description" content='중소기업 썰 ㅋ'></meta>
            </Head>
            <input type="text" value={hello} />
                정
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                준
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                일
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </pre>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

    const hello   =  context.query.postId;
    /*
    const postFlag = context.query.postFlag;
    const submitDay = context.query.submitDay;
    const pid = context.query.pid; //게시글 작성자
    const nickName = context.query.userNickName; //현재 로그인한 사람의 닉네임
    const who       = context.query.who;        //현재 로그인한 사람의 아이디값
    */
return {
    props: {hello}, // will be passed to the page component as props
    } 

});
  
export default SSRComponent;