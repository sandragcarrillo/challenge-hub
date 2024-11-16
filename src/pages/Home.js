import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from '@tonconnect/ui-react'
import Page from '../components/Page'
import { Button, LargeTitle, Text } from '@telegram-apps/telegram-ui'
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { User } from 'lucide-react'

const Home = () => {
  // WalletConnect - Wagmi
  // https://wagmi.sh/react/getting-started
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()

  // TonConnect
  // https://docs.ton.org/develop/dapps/ton-connect/react
  const wallet = useTonWallet()
  const userFriendlyAddress = useTonAddress()

  const lp = useLaunchParams()

  console.log('Launch params:', lp)
  console.log('Wagmi:', address, isConnected)
  console.log('TON:', wallet)

  return (
    <Page>
      {!isConnected ? (
        // Sección cuando el usuario no está conectado
        <>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            height: '70vh'
            
          }}>
            <LargeTitle weight="1">Challenge Hub</LargeTitle>
            <div style={{ 
              width: '100%', 
              height: '70vh',
              backgroundColor: 'red' 
            }}></div>
          </div>
          <br />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            marginTop: 'auto',
          }}>
            <Text>Start playing</Text>
            <br />
            <Button onClick={() => open()}>
              <span>{isConnected ? 'Open Profile' : 'Connect EVM wallet'}</span>
            </Button>
            <br />
            <Text>
              {address} {isConnected}
            </Text>
            <div style={{ margin: 'auto', width: 'fit-content' }}>
              <TonConnectButton />
            </div>
            <Text>{userFriendlyAddress}</Text>
            <hr />
          </div>
        </>
      ) : (
        <>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%', 
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <LargeTitle>Challenge Hub</LargeTitle>
            <Button 
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
              onClick={() => open()}
            >
              <User style={{ fontSize: '20px' }} />
              {isConnected ? null : 'Connect EVM wallet'}
            </Button>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center', 
          }}>
            <LargeTitle style={{ padding: '20px' }}>Welcome to Challenge Hub!</LargeTitle>
            <Text style={{ textAlign: 'center', maxWidth: '600px', margin: '20px 0' }}>
              Challenge Hub es tu espacio para participar en emocionantes retos de blockchain. 
              Crea o únete a desafíos y lleva tu experiencia al siguiente nivel.
            </Text>
            <div style={{ display: 'flex',  flexDirection: 'column', gap: '10px', marginTop: '20px', width: '100%',           // Opcional: para que los botones ocupen el ancho disponible
              maxWidth: '300px' }}>
              <Button onClick={() => console.log('Create a challenge')}>
                Create a challenge
              </Button>
              <Button onClick={() => console.log('Join a challenge')}>
                Join a challenge
              </Button>
            </div>
          </div>
        </>
      )}
    </Page>
  )
}

export default Home
