// Ensure that roboto_mono is properly imported from wherever it's defined
import { Roboto_Mono } from 'next/font/google';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

import { APP_NAME } from '../../consts/app';
import { TransferTokenCard } from '../../features/transfer/TransferTokenCard';
import { TransferHistory } from '../../features/wallet/TransferHistory';
import { WalletControlBar } from '../../features/wallet/WalletControlBar';

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
      <div className="bg-[#121214] py-3 relative">
        <div className="md:max-w-[1100px] mx-auto w-full px-4 flex justify-center xl:gap-4 gap-4 items-start 2xl:pt-10 py-2 md:flex-nowrap flex-wrap">
          <div className="md:max-w-[620px] w-full">
            <div className="md:hidden block">
              <WalletControlBar />
            </div>
            <TransferTokenCard />
          </div>
          <div className="md:max-w-[474px] w-full">
            <div className="md:block hidden">
              <WalletControlBar />
            </div>
            <div className="mt-3">
              <TransferHistory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
