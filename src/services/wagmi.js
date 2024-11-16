import { createConfig, fallback, http, unstable_connector } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { mainnet, zircuitTestnet } from 'viem/chains'
import { WC_WEB3_PROJECT_ID } from '../constants'

const metadata = {
  name: 'Challenge Hub',
  description: 'Interactive Telegram app designed to bring communities together through fun and engaging challenges.',
  url: 'http://localhost:3000',
}

const chains = [mainnet, zircuitTestnet]

export const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: fallback([
      unstable_connector(injected),
      http('https://ethereum.publicnode.com'),
      http('https://eth.llamarpc.com'),
      http('https://cloudflare-eth.com'),
    ]),
    [zircuitTestnet.id]: fallback([
      unstable_connector(injected),
      http('https://zircuit1-testnet.p2pify.com/'),
    ]),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: WC_WEB3_PROJECT_ID,
      walletFeatures: false,
      showQrModal: false,
    }),
  ],
  metadata,
});
