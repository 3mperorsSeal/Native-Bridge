import Image from 'next/image';
import Link from 'next/link';

import { WalletControlBar } from '../../features/wallet/WalletControlBar';
import Logo from '../../images/logos/app-logo.svg';

export function Header() {
  return (
    <header className="px-2 sm:px-6 lg:px-12 pt-3 pb-2 w-full">
      <div className="flex items-start justify-between">
        <Link href="/" className="py-0 flex items-center">
          <Image src={Logo} width={100} height={30} alt="" className="md:w-[210px]" />
        </Link>
        <div className="flex flex-col items-end md:flex-row-reverse md:items-start gap-2 pt-1">
          <WalletControlBar />
        </div>
      </div>
    </header>
  );
}
