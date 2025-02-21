import Image from 'next/image';
import { useState } from 'react';

import { ProtocolType, shortenAddress } from '@hyperlane-xyz/utils';

import Logo from '../../../public/favicon-32x32.png';
import { SolidButton } from '../../components/buttons/SolidButton';
import Wallet from '../../images/icons/wallet.svg';
import { useIsSsr } from '../../utils/ssr';

import { SideBarMenu } from './SideBarMenu';
import { WalletEnvSelectionModal } from './WalletEnvSelectionModal';
import { useAccounts, useDisconnectFns, useWalletDetails } from './hooks/multiProtocol';

export function WalletControlBar() {
  const disconnects = useDisconnectFns();

  const isSsr = useIsSsr();

  const [showEnvSelectModal, setShowEnvSelectModal] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const { readyAccounts } = useAccounts();
  const walletDetails = useWalletDetails();

  const numReady = readyAccounts.length;
  const firstAccount = readyAccounts[0];
  const firstWallet = walletDetails[firstAccount?.protocol || ProtocolType.Ethereum];

  if (isSsr) {
    // https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142
    return null;
  }

  const onClickDisconnect = async () => {
    for (const disconnectFn of Object.values(disconnects)) {
      await disconnectFn();
    }
  };

  return (
    <>
      <div className="w-full border border-white rounded-xl py-4 2xl:px-6 lg:px-5 px-4 bg-black md:flex gap-8">
        <div className="flex flex-col bg-[#161616] p-5 rounded-lg w-full md:max-w-[202px]">
          <div className="flex items-center gap-2 ">
            <Image src={Logo} alt="Logo" className="h-8" />
            {readyAccounts.length && readyAccounts[0].addresses.length ? (
              <span className="text-white font-mono text-sm truncate roboto">
                {shortenAddress(readyAccounts[0].addresses[0].address)}
              </span>
            ) : (
              <span className="text-gray-400">Not Connected</span>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 flex-col relative z-10 md:mt-0 mt-3 w-full">
          {numReady === 0 ? (
            <SolidButton
              classes="py-2 px-3"
              onClick={() => setShowEnvSelectModal(true)}
              title="Choose wallet"
              icon={<Image src={Wallet} alt="" width={16} height={16} />}
              color="orange"
            >
              <div className="ml-1.5 text-xs sm:text-sm">Connect Wallet</div>
            </SolidButton>
          ) : (
            <SolidButton
              classes="py-2 px-3"
              onClick={onClickDisconnect}
              title="Disconnect Wallet"
              icon={<Image src={Wallet} alt="" width={16} height={16} />}
              color="orange"
            >
              <div className="ml-1.5 text-xs sm:text-sm">Disconnect Wallet</div>
            </SolidButton>
          )}
          {/* {numReady === 1 && (
            <SolidButton
              onClick={() => setIsSideBarOpen(true)}
              classes="px-2.5 py-1 border border-white"
              color="black"
            >
              <div className="flex items-center justify-center">
                <WalletLogo walletDetails={firstWallet} size={26} />
                <div className="flex flex-col mx-3 items-start">
                  <div className="text-xs text-white">{firstWallet.name || 'Wallet'}</div>
                  <div className="text-xs text-white">
                    {readyAccounts[0].addresses.length
                      ? shortenAddress(readyAccounts[0].addresses[0].address, true)
                      : 'Unknown'}
                  </div>
                </div>
              </div>
            </SolidButton>
          )} */}

          {/* <Link to="/">
              <button className="flex items-center md:justify-start justify-center gap-2 bg-[#FF9900] text-black text-sm py-2 px-6 rounded-md font-semibold w-full roboto">
                <img className="pe-2" src={Home} alt="Home Icon" />
                Home Page
              </button>
            </Link> */}
        </div>
      </div>
      <div className="relative">
        {/* <div className="relative">
          {numReady === 0 && (
            <SolidButton
              classes="py-2 px-3"
              onClick={() => setShowEnvSelectModal(true)}
              title="Choose wallet"
              icon={<Image src={Wallet} alt="" width={16} height={16} />}
              color="white"
            >
              <div className="ml-1.5 text-xs sm:text-sm">Connect Wallet</div>
            </SolidButton>
          )}

          {numReady === 1 && (
            <SolidButton
              onClick={() => setIsSideBarOpen(true)}
              classes="px-2.5 py-1 border border-white"
              color="black"
            >
              <div className="flex items-center justify-center">
                <WalletLogo walletDetails={firstWallet} size={26} />
                <div className="flex flex-col mx-3 items-start">
                  <div className="text-xs text-white">{firstWallet.name || 'Wallet'}</div>
                  <div className="text-xs text-white">
                    {readyAccounts[0].addresses.length
                      ? shortenAddress(readyAccounts[0].addresses[0].address, true)
                      : 'Unknown'}
                  </div>
                </div>
              </div>
            </SolidButton>
          )}

          {numReady > 1 && (
            <SolidButton onClick={() => setIsSideBarOpen(true)} classes="px-2.5 py-1" color="white">
              <div className="flex items-center justify-center">
                <div
                  style={{ height: 26, width: 26 }}
                  className="bg-orange-500 text-white flex items-center justify-center rounded-full"
                >
                  {numReady}
                </div>
                <div className="flex flex-col mx-3 items-start">
                  <div className="text-xs text-gray-500">Wallets</div>
                  <div className="text-xs">{`${numReady} Connected`}</div>
                </div>
              </div>
            </SolidButton>
          )}
        </div> */}

        <WalletEnvSelectionModal
          isOpen={showEnvSelectModal}
          close={() => setShowEnvSelectModal(false)}
        />
        {numReady > 0 && (
          <SideBarMenu
            onClose={() => setIsSideBarOpen(false)}
            isOpen={isSideBarOpen}
            onConnectWallet={() => setShowEnvSelectModal(true)}
          />
        )}
      </div>
    </>
  );
}
