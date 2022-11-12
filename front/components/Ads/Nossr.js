import dynamic from 'next/dynamic'; 


const Nossr = dynamic(()=>import('./GooleAds_footer'),{ssr:false}); 

export default Nossr; 