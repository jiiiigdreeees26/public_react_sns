import type { AppProps } from 'next/app';
import '../styles/globals.css'; // グローバルCSS
import { Layout } from '../components/Layout'; // 共通レイアウト
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Navbar } from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';

export default function MySNS({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
