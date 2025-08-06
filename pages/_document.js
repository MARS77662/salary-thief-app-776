// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        {/* 加上 manifest 連結 */}
        <link rel="manifest" href="/manifest.json" />
        {/* PWA 額外推薦設定 */}
        <meta name="theme-color" content="#1A1A1A" />
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

