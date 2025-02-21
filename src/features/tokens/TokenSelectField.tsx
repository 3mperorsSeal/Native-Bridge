import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IToken } from '@hyperlane-xyz/sdk';

import { TokenIcon } from '../../components/icons/TokenIcon';
import { getIndexForToken, getTokenByIndex, getWarpCore } from '../../context/context';
import ChevronIcon from '../../images/icons/chevron-down.svg';
import { TransferFormValues } from '../transfer/types';

import { TokenListModal } from './TokenListModal';

type Props = {
  name: string;
  disabled?: boolean;
  setIsNft: (value: boolean) => void;
};

export function TokenSelectField({ name, disabled, setIsNft }: Props) {
  const { values } = useFormikContext<TransferFormValues>();
  const [field, , helpers] = useField<number | undefined>(name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutomaticSelection, setIsAutomaticSelection] = useState(false);

  const { origin, destination } = values;
  useEffect(() => {
    const tokensWithRoute = getWarpCore().getTokensForRoute(origin, destination);
    let newFieldValue: number | undefined;
    let newIsAutomatic: boolean;
    // No tokens available for this route
    if (tokensWithRoute.length === 0) {
      newFieldValue = undefined;
      newIsAutomatic = true;
    }
    // Exactly one found
    else if (tokensWithRoute.length === 1) {
      newFieldValue = getIndexForToken(tokensWithRoute[0]);
      newIsAutomatic = true;
      // Multiple possibilities
    } else {
      newFieldValue = undefined;
      newIsAutomatic = false;
    }
    helpers.setValue(newFieldValue);
    setIsAutomaticSelection(newIsAutomatic);
  }, [origin, destination, helpers]);

  const onSelectToken = (newToken: IToken) => {
    // Set the token address value in formik state
    helpers.setValue(getIndexForToken(newToken));
    // Update nft state in parent
    setIsNft(newToken.isNft());
  };

  const onClickField = () => {
    if (!disabled && !isAutomaticSelection) setIsModalOpen(true);
  };

  return (
    <>
      <TokenButton
        token={getTokenByIndex(field.value)}
        disabled={isAutomaticSelection || disabled}
        onClick={onClickField}
        isAutomatic={isAutomaticSelection}
      />
      <TokenListModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        onSelect={onSelectToken}
        origin={values.origin}
        destination={values.destination}
      />
    </>
  );
}

function TokenButton({
  token,
  disabled,
  onClick,
  isAutomatic,
}: {
  token?: IToken;
  disabled?: boolean;
  onClick?: () => void;
  isAutomatic?: boolean;
}) {
  return (
    <div className={`${styles.base} ${disabled ? styles.disabled : styles.enabled}`}>
      <div className="flex items-center justify-between cursor-pointer" onClick={onClick}>
        <button type="button">
          <div className="flex items-center">
            {token && <TokenIcon token={token} size={20} />}
            <span className={`ml-2 ${!token?.symbol && 'text-white'}`}>
              {token?.symbol || (isAutomatic ? 'No routes available' : 'Select Token')}
            </span>
          </div>
        </button>
        <div>{!isAutomatic && <Image src={ChevronIcon} width={12} height={8} alt="" />}</div>
      </div>
    </div>
  );
}

const styles = {
  base: 'mt-1.5 w-full px-2.5 py-2  text-sm rounded-lg border border-[#3b3c4e]  outline-none transition-colors duration-500 bg-black text-white',
  enabled: 'hover:bg-black  focus:border-blue-500',
  disabled: ' cursor-default',
};
