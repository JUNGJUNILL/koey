
//https://github.com/nhn/tui.editor/blob/master/docs/v3.0-migration-guide-ko.md#1-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95
//https://leego.tistory.com/entry/React-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-TOAST-UI-Editor-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
//https://velog.io/@hmds1606/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0220713
import dynamic from"next/dynamic"; 

const PostEditUpgrade = dynamic(()=> import("../../components/mainPosts_1001/ToastEditor"),{ssr:false}); 


const Sample = () =>{

    return (
        <PostEditUpgrade />
    )
}

export default Sample; 