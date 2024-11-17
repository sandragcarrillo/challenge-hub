import { ethers } from 'ethers'
import verifierABI from './abis/Groth16Verifier.json'
import curiosChallengeABI from './abis/CuriosChallenge.json'

export const VERIFIER_ADDRESS = '0x201B30C1B71E3Dcf61bE22D04166A854203c6E90'
export const CURIOSCHALLENGE_ADDRESS = '0xBcF2EbE34681ea0a0F7D93E3326EBB9a16a5C35C'




export function getContract(address, abi, provider) {
  return new ethers.Contract(address, abi, provider)
}


export function getVerifierContract(provider) {
  return getContract(VERIFIER_ADDRESS, verifierABI, provider)
}

export function getCuriosChallengeContract(provider) {
  return getContract(CURIOSCHALLENGE_ADDRESS, curiosChallengeABI, provider)
}
