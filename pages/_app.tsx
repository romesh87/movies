import Head from 'next/head';

import Layout from '../components/Layout/Layout';

import '../styles/globals.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
      <Component {...pageProps} />
  </Layout>
);

export default MyApp;
