import dynamic from 'next/dynamic'; 


const NossrToastEditor=dynamic(()=>import('./ToastEditor'),{ssr:false}); 

export default NossrToastEditor; 
