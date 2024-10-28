import Link from 'next/link';

import { links } from '../../consts/links';
import { Color } from '../../styles/Color';
import { HyperlaneLogo } from '../icons/HyperlaneLogo';

const footerLinks1 = [
  { title: 'Docs', url: links.docs, external: true },
  { title: 'Homepage', url: links.home, external: true },
  { title: 'Explorer', url: links.explorer, external: true },
  { title: 'Chains', url: links.chains, external: true },
];

export function Footer() {
  return (
    <footer className="text-white relative">
      <div className="relative z-10 px-8 pb-5 pt-2 sm:pt-0 bg-orange-500">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center justify-between">
          <div className="flex items-center justify-center pt-4">
            <div className="ml-2 w-12 sm:w-12 h-12 sm:h-12">
              <HyperlaneLogo fill={Color.primaryWhite} />
            </div>
            <div className="text-lg sm:text-xl font-medium ml-6 space-y-1 ">
              <div>Hyperlane</div>
            </div>
          </div>
          <nav className="flex text-md font-medium pt-5">
            <ul className={`${styles.linkCol} mr-0 lg:mr-14`}>
              {footerLinks1.map((item) => (
                <li className="" key={item.title}>
                  <Link
                    className={styles.linkItem}
                    target={item.external ? '_blank' : '_self'}
                    href={item.url}
                  >
                    <div className="">{item.title}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  linkCol: 'flex flex-row gap-3',
  linkItem: 'flex items-center capitalize text-decoration-none hover:underline underline-offset-2',
};
