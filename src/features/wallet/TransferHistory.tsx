import Image from 'next/image';
import { useMemo, useState } from 'react';

import { SmallSpinner } from '../../components/animation/SmallSpinner';
import { ChainLogo } from '../../components/icons/ChainLogo';
import { tryFindToken } from '../../context/context';
import ArrowIcon from '../../images/icons/arrow-2.svg';
import { STATUSES_WITH_ICON, getIconByTransferStatus } from '../../utils/transfer';
import { getChainDisplayName } from '../chains/utils';
import { useStore } from '../store';
import { TransfersDetailsModal } from '../transfer/TransfersDetailsModal';
import { TransferContext } from '../transfer/types';

export function TransferHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<TransferContext | null>(null);

  const { transfers, resetTransfers } = useStore((s) => ({
    transfers: s.transfers,
    resetTransfers: s.resetTransfers,
  }));

  const sortedTransfers = useMemo(
    () => [...transfers].sort((a, b) => b.timestamp - a.timestamp) || [],
    [transfers],
  );

  return (
    <div className="w-full bg-black shadow-lg p-4 rounded-lg border border-[#FF9900] flex flex-col justify-center items-center">
      <p className="w-[100px] h-[35px] flex justify-center items-center rounded-md bg-black roboto text-[#FF9900] text-[12px] font-bold border border-[#FF9900] mb-4">
        Transfer History
      </p>
      <div
        className="flex flex-col w-full mb-2 max-h-[300px] overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // Internet Explorer and Edge
        }}
      >
        {sortedTransfers?.length > 0 ? (
          sortedTransfers.map((t, i) => (
            <TransferSummary
              key={i}
              transfer={t}
              onClick={() => {
                setSelectedTransfer(t);
                setIsModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="text-white-500 text-sm">No transfer history available.</div>
        )}
      </div>
      {sortedTransfers?.length > 0 && (
        <button
          onClick={resetTransfers}
          className="mt-5 flex flex-row items-center roboto text-[#FF9900] text-[12px] font-bold border border-[#FF9900] py-3 px-2 rounded-md"
        >
          Reset transaction history
        </button>
      )}
      {selectedTransfer && (
        <TransfersDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTransfer(null);
          }}
          transfer={selectedTransfer}
        />
      )}
    </div>
  );
}

function TransferSummary({
  transfer,
  onClick,
}: {
  transfer: TransferContext;
  onClick: () => void;
}) {
  const { amount, origin, destination, status, timestamp, originTokenAddressOrDenom } = transfer;
  const token = tryFindToken(origin, originTokenAddressOrDenom);

  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center rounded-xl border border-transparent cursor-pointer transition-all duration-200 
        px-2.5 py-2 mb-2.5 
        bg-[#191919] text-white 
        hover:border-[#FF9900]  
        active:border-[#FF9900] `}
    >
      <div className="flex">
        <div className="mr-2.5 flex flex-col items-center justify-center rounded-full bg-gray-100 h-[2.25rem] w-[2.25rem] p-1.5">
          <ChainLogo chainName={origin} size={20} />
        </div>
        <div className="flex flex-col">
          <div className="flex items items-baseline">
            <span className="text-white text-sm font-normal">{amount}</span>
            <span className="text-white text-sm font-normal ml-1">{token?.symbol || ''}</span>
          </div>
          <div className="mt-1 flex flex-row items-center justify-center">
            <span className="text-thin text-white font-normal tracking-wide">
              {getChainDisplayName(origin, true)}
            </span>
            <Image src={ArrowIcon} width={7} height={7} alt="" className="mx-2" />
            <span className="text-thin text-white font-normal tracking-wide">
              {getChainDisplayName(destination, true)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-6 h-6">
        {STATUSES_WITH_ICON.includes(status) ? (
          <Image src={getIconByTransferStatus(status)} width={25} height={25} alt="" />
        ) : (
          <SmallSpinner className="-ml-1 mr-3" />
        )}
      </div>
    </button>
  );
}
