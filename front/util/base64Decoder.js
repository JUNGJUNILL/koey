
export const base64Decoder = (str) =>{


    const  convertStr = Buffer.from(str,"base64").toString('utf8');     

    //encoding
    //console.log(Buffer.from("dala1207@naver.com").toString('base64')); 
    return convertStr; 

}
export default base64Decoder; 