import { ChainMap, ChainMetadata } from '@hyperlane-xyz/sdk';

// A map of chain names to ChainMetadata
// Chains can be defined here, in chains.json, or in chains.yaml
// Chains already in the SDK need not be included here unless you want to override some fields
// Schema here: https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/metadata/chainMetadataTypes.ts
export const chains: ChainMap<ChainMetadata & { mailbox?: Address }> = {
  // pulsechain: {
  //   protocol: ProtocolType.Ethereum,
  //   chainId: 369,
  //   domainId: 369,
  //   name: 'pulsechain',
  //   displayName: 'PulseChain',
  //   nativeToken: { name: 'pulsechain', symbol: 'PLS', decimals: 18 },
  //   rpcUrls: [
  //     { http: 'https://rpc.pulsechain.com' },
  //     { http: 'https://pulsechain-rpc.publicnode.com' },
  //   ],
  //   blockExplorers: [
  //     {
  //       name: 'Pulsechain Explorer',
  //       url: 'https://oldscan.gopulse.com/#/',
  //       apiUrl: 'https://api.scan.pulsechain.com/api',
  //       family: ExplorerFamily.Blockscout,
  //     },
  //     {
  //       name: 'Otterscan',
  //       url: 'https://otter.pulsechain.com',
  //       apiUrl: 'https://api.scan.pulsechain.com/api',
  //       family: ExplorerFamily.Other,
  //     },
  //   ],
  //   blocks: {
  //     confirmations: 1,
  //     reorgPeriod: 0,
  //     estimateBlockTime: 10,
  //   },
  //   logoURI: '/logo.svg',
  // },
};
