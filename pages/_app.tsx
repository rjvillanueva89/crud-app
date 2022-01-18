import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
      <Head>
        <title>CRUD App</title>
        <meta name="description" content="Why you gotta be so CRUD!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
}

export default MyApp
