import { TokenStandard, WarpCoreConfig } from '@hyperlane-xyz/sdk';

// A list of Warp Route token configs
// These configs will be merged with the warp routes in the configured registry
// The input here is typically the output of the Hyperlane CLI warp deploy command
export const warpRouteConfigs: WarpCoreConfig = {
  tokens: [
    {
      symbol: 'HOA',
      name: 'Hex Orange Address',
      decimals: 18,
      chainName: 'base',
      addressOrDenom: '0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46',
      standard: TokenStandard.EvmHypSynthetic,
      connections: [
        {
          token: 'ethereum|pulsechain|0x50d03965Ed30de5d246BdDa18E7B10A8904B8CF1',
        },
      ],
    },
    {
      name: 'Hex Orange Address',
      symbol: 'HOA',
      decimals: 18,
      chainName: 'pulsechain',
      standard: TokenStandard.EvmHypCollateral,
      addressOrDenom: '0x50d03965Ed30de5d246BdDa18E7B10A8904B8CF1',
      collateralAddressOrDenom: '0x7901a3569679AEc3501dbeC59399F327854a70fe',
      connections: [
        {
          token: 'ethereum|base|0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46',
        },
      ],
    },
  ],
  options: {},
};
