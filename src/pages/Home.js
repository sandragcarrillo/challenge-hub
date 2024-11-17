import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Page from '../components/Page'
import { Button, LargeTitle, Text, Input } from '@telegram-apps/telegram-ui'
import { User } from 'lucide-react'
import { getCuriosChallengeContract } from '../contractConfig'

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    winners: '',
    reward: '',
    hint: '',
    answers: '',
  })
  const [showChallenges, setShowChallenges] = useState(false)
  const [challenges, setChallenges] = useState([
    { id: 1, name: 'Challenge 1' },
    { id: 2, name: 'Challenge 2' },
    { id: 3, name: 'Challenge 3' },
  ])

  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isConnected) {
      alert('Please connect your wallet.')
      return
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const curiosChallengeContract = getCuriosChallengeContract(signer)

      // Parse reward to Wei
      const rewardInWei = ethers.utils.parseUnits(formValues.reward, 'ether')

      // Generate a Merkle Root from the answers
      const merkleRoot = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(formValues.answers)
      )

      // Create transaction options
      const options = { value: rewardInWei }

      // Call the contract to create a challenge
      const tx = await curiosChallengeContract.createChallenge(
        formValues.name,
        formValues.hint,
        formValues.winners,
        merkleRoot,
        'metadata_placeholder',
        options
      )

      await tx.wait() // Wait for the transaction to complete

      alert('Challenge created successfully!')
      setChallenges((prev) => [
        ...prev,
        { id: prev.length + 1, name: formValues.name },
      ])
      setShowForm(false)
    } catch (error) {
      console.error('Error creating challenge:', error)
      alert('Failed to create challenge. Please check the console for details.')
    }
  }

  const handleJoinChallenge = (challengeId) => {
    console.log(`Joined Challenge with ID: ${challengeId}`)
  }

  return (
    <Page>
      {!isConnected ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '70vh',
            }}
          >
            <LargeTitle weight="1">Challenge Hub</LargeTitle>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <Text>Start playing</Text>
            <Button onClick={() => open()}>
              <span>{isConnected ? 'Open Profile' : 'Connect EVM wallet'}</span>
            </Button>
            <Text>{address} {isConnected}</Text>
          </div>
        </>
      ) : (
        <>
          {!showForm && !showChallenges ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '20px',
                  boxSizing: 'border-box',
                }}
              >
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '70vh',
                  textAlign: 'center',
                }}
              >
                <LargeTitle>Welcome to Challenge Hub!</LargeTitle>
                <Text>
                  Challenge Hub is your place for exciting blockchain challenges.
                </Text>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '20px',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                >
                  <Button onClick={() => setShowForm(true)}>Create a challenge</Button>
                  <Button onClick={() => setShowChallenges(true)}>Join a challenge</Button>
                </div>
              </div>
            </>
          ) : showForm ? (
            <div>
              <LargeTitle>Create a Challenge</LargeTitle>
              <form onSubmit={handleSubmit}>
                <Input
                  name="name"
                  placeholder="Name"
                  required
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                <Input
                  name="winners"
                  type="number"
                  placeholder="How many winners?"
                  required
                  value={formValues.winners}
                  onChange={handleInputChange}
                />
                <Input
                  name="reward"
                  type="text"
                  placeholder="Reward (ETH)"
                  required
                  value={formValues.reward}
                  onChange={handleInputChange}
                />
                <Input
                  name="hint"
                  placeholder="Challenge Hint"
                  required
                  value={formValues.hint}
                  onChange={handleInputChange}
                />
                <Input
                  name="answers"
                  placeholder="Answers"
                  required
                  value={formValues.answers}
                  onChange={handleInputChange}
                />
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => setShowForm(false)}>Cancel</Button>
              </form>
            </div>
          ) : (
            <div>
              <LargeTitle>Join a Challenge</LargeTitle>
              <div>
                {challenges.map((challenge) => (
                  <div key={challenge.id}>
                    <Text>{challenge.name}</Text>
                    <Button onClick={() => handleJoinChallenge(challenge.id)}>Join</Button>
                  </div>
                ))}
                <Button onClick={() => setShowChallenges(false)}>Back</Button>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  )
}

export default Home
