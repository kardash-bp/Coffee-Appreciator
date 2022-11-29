import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='/fonts/BaiJamjuree-Bold.ttf'
            as='font'
            type='font/ttf'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/BaiJamjuree-SemiBold.ttf'
            as='font'
            type='font/ttf'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/BaiJamjuree-Regular.ttf'
            as='font'
            type='font/ttf'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
