import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export function Card({ className, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`py-10  lg:px-10 md:px-8 px-4 md:mt-0 mt-4 relative bg-black border border-white rounded-3xl overflow-auto ${className}`}
    >
      {children}
    </div>
  );
}
