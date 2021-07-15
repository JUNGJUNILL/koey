
export const secureFilter = (str) =>{

    let strValue = str; 
    strValue = strValue.split("<").join("&lt;"); 
    strValue = strValue.split(">").join('&gt;'); 
    strValue = strValue.split("\"").join("&quot;"); 
    strValue = strValue.split("'").join("＇"); 
    strValue = strValue.split("alert").join("ａlert"); 
    strValue = strValue.split("cookie").join("ｃookie"); 
    strValue = strValue.split("script").join("ｓcript"); 
    strValue = strValue.split("jquery").join("ｊquery"); 
   
     return strValue; 

}
export default secureFilter; 