import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import { useState } from 'react';

import { ChainLogo } from '../../components/icons/ChainLogo';
import ChevronIcon from '../../images/icons/chevron-down.svg';
import { TransferFormValues } from '../transfer/types';

import { ChainSelectListModal } from './ChainSelectModal';
import { getChainDisplayName } from './utils';

type Props = {
  name: string;
  label: string;
  chains: ChainName[];
  onChange?: (id: ChainName) => void;
  disabled?: boolean;
};

export function ChainSelectField({ name, label, chains, onChange, disabled }: Props) {
  const [field, , helpers] = useField<ChainName>(name);
  const { setFieldValue } = useFormikContext<TransferFormValues>();

  const handleChange = (newChainId: ChainName) => {
    helpers.setValue(newChainId);
    // Reset other fields on chain change
    setFieldValue('recipient', '');
    setFieldValue('amount', '');
    setFieldValue('tokenIndex', undefined);
    if (onChange) onChange(newChainId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = () => {
    if (!disabled) setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col ">
        <div className="mb-3">
          <span className="text-gray-400 text-base font-normal roboto leading-normal">{label}</span>
        </div>
      </div>
      <button
        type="button"
        name={field.name}
        className={`${styles.base} ${disabled ? styles.disabled : styles.enabled}`}
        onClick={onClick}
      >
        <div className="flex items-center img-color">
          <div className="items-center cursor-pointer bg-[#191919] px-2 py-1 rounded-lg">
            <ChainLogo chainName={field.value} size={20} />
          </div>
          <span className="ml-2 text-base leading-7">{getChainDisplayName(field.value, true)}</span>
        </div>
        <Image src={ChevronIcon} width={12} height={8} alt="" />
      </button>
      <ChainSelectListModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        chains={chains}
        onSelect={handleChange}
      />
    </div>
  );
}

const styles = {
  base: 'w-full px-2.5 py-2 relative -top-1.5 flex items-center justify-between text-sm bg-transparent rounded-lg border border-[#3b3c4e] outline-none transition-colors duration-500 text-white',
  enabled: ' active:bg-gray-100 focus:border-blue-500',
  disabled: 'bg-gray-150 cursor-default',
};
