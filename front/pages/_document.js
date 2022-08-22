import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head> 
        <meta charSet="utf-8" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
         {/*구글에드 센스_20210902 

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
        <script
        dangerouslySetInnerHTML={{
          __html: `
             (adsbygoogle = window.adsbygoogle || []).push({
                 google_ad_client: "ca-pub-9160341796142118",
                 enable_page_level_ads: true
            });
              `
        }}/>
      */}
    
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument