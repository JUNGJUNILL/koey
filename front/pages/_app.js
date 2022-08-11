import React from 'react';

import Head from 'next/head';
import 'antd/dist/antd.css';
import  '../CSS/antdMobile.css';
import AppLayout from '../components/AppLayout'; 
import wrapper from '../store/configureStore';


const Koey = ({ Component, pageProps }) => (
    <div>
      <AppLayout>
         <Component {...pageProps} />
      </AppLayout>
    </div>
  );


  export function reportWebVitals(metric) {
    //console.log('metric===>' , metric);
  }

  
export default wrapper.withRedux(Koey);