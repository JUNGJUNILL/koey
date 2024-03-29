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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name ="author" content="JJI" />
        <meta name ="reply-to" content="devjji1207@gmail.com" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
         {/*구글에드 센스_20210902*/}
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
   
    
        </Head>
        <body>
          <title>좋소-중소기업</title>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument