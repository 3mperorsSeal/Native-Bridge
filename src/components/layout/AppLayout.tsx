// Ensure that roboto_mono is properly imported from wherever it's defined
import { Roboto_Mono } from 'next/font/google';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

import { APP_NAME } from '../../consts/app';
import { Footer } from '../nav/Footer';
import { Header } from '../nav/Header';

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});
// Update this path as needed

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{APP_NAME}</title>
      </Head>
      <div
        id="app-content"
        className="relative flex flex-col justify-between h-full min-h-screen w-full min-w-screen bg-blue-500"
      >
        <header>
          <Header />
        </header>
        <div className="sm:px-4 mx-auto grow flex items-center max-w-screen-xl mb-10">
          <main
            className={`w-full flex-1 my-4 flex items-center justify-center ${roboto_mono.className}`}
          >
            {children}
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
