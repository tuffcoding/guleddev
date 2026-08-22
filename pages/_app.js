// pages/_app.js
import Head from 'next/head'
import Script from 'next/script'
// If you converted styles.css into styles/globals.css, uncomment the line below
// import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* If you kept styles.css in public/, load it here */}
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      {/* load old DOM script after page is interactive */}
      <Script src="/app.js" strategy="afterInteractive" />

      <Component {...pageProps} />
    </>
  )
}
