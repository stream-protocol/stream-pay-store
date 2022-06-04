import Head from 'next/head'

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>StreamPay Store</title>
      <meta name="title" content="StreamPay Store" />
      <meta
        name="description"
        content="Buy Tokenized gold using SolanaPay!"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://twitter.com/stream_protocol" />
      <meta property="twitter:title" content="StreamPay Store" />
      <meta
        property="twitter:description"
        content="Buy Tokenized gold using SolanaPay!"
      />
      <meta
        property="twitter:image"
        content="https://i.imgur.com/vGRVFMJ.png"
      />
    </Head>
  )
}
