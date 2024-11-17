# Challenge Hub 

Challenge Hub is a Telegram mini app with the most simplified real-time gaming fun and smooth crypto payments.

[Challenge Hub on Telegram](https://t.me/mini_quests_bot/mychallenge)
[Challenge Hub Slides](https://www.canva.com/design/DAGWqQUnHp8/hb3wdu1l4p-_GIAK8_sbtA/view?utm_content=DAGWqQUnHp8&utm_campaign=designshare&utm_medium=link&utm_source=editor)

**Onboard new users into Web3**

Challenge Hub helps DAOs and communities maintaining the security of new members, without the need to reveal their identities, just using Telegram.

**Customized funny challenges**

Allows users to create their own challenges and earn prizes for the winners.

**ZK Proof**
 
 The dapp has two contracts that uses zk-SNARKs to verify the winners of the challenges:

 - **Groth16Verifier**: 
  - Verifies zk-SNARK proofs. 
  - [Verifier contract deployed on Zircuit testnet](https://explorer.testnet.zircuit.com/address/0x201B30C1B71E3Dcf61bE22D04166A854203c6E90?activeTab=3)
- **CuriosChallenge**:
  - Allows users to create challenges with prize pools.
  - Supports Merkle tree roots for secure participant verification.
  - Implements prize claiming with zk-SNARK proof verification.
  - Admin tools for invalidating challenges.
  - [CuriosChallenge contract deployed on Zircuit testnet](https://explorer.testnet.zircuit.com/address/0xBcF2EbE34681ea0a0F7D93E3326EBB9a16a5C35C)

  [Repository with contracts](https://github.com/sandragcarrillo/challenge-hub-contracts)


## Zircuit Integration

We use Zircuit to deploy the contracts to generate zk-SNARKs and verify the proofs, using this chain for its secure and private transactions.

## zk-SNARK Integration
This project uses a zk-SNARK setup with Groth16. Steps for generating zk-SNARK proofs are included in the circom/ folder.

---

## Tech Stack

- [React](https://react.dev/) + [Express](https://expressjs.com/)
- [Wagmi](https://wagmi.sh/) + [WalletConnect](https://reown.com/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@telegram-apps SDK](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x)
- [Telegram UI](https://tgui.xelene.me/?path=/docs/getting-started--documentation)
- [Zircuit](https://docs.zircuit.com/)




## Resources
- [Hardhat Documentation](https://hardhat.org/docs)
- [Circom Documentation](https://docs.circom.io/)
- [Zircuit Documentation](https://docs.zircuit.com/)


# Web3 Telegram Mini App Boilerplate

A ready-to-use boilerplate for building Web3 Telegram Mini Apps.
This tech stack includes:
- [React](https://react.dev/) + [Express](https://expressjs.com/)
- [Wagmi](https://wagmi.sh/) + [WalletConnect](https://reown.com/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@telegram-apps SDK](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x)
- [Telegram UI](https://tgui.xelene.me/?path=/docs/getting-started--documentation)

## Install Dependencies

Install the project dependencies using:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

## Scripts

This project contains the following scripts:

- `dev`: Runs the application in development mode
- `build`: Builds the application for production
- `start`: Starts the production server
- `test`: Runs tests
- `eject`: Ejects from create-react-app


## Setup and Development

### Environment Setup

1. Create a `.env` file in the root directory:

```bash
WC_WEB3_PROJECT_ID=your_walletconnect_project_id  # Get this from https://cloud.walletconnect.com/
REACT_APP_PUBLIC_URL=your dApp public url
```

### Production

1. Build the application:

```bash
yarn build
```

2. Start the production server:

```bash
yarn start
```
