import { Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import { NEST_ADDRESS } from './addresses'

export const NEST: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    NEST_ADDRESS[1],
    18,
    'NEST',
    'NEST'
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    NEST_ADDRESS[4],
    18,
    'NEST',
    'NEST'
  ),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, NEST_ADDRESS[56], 18, 'NEST', 'NEST'),
  [SupportedChainId.BSCTestnet]: new Token(
    SupportedChainId.BSCTestnet,
    NEST_ADDRESS[97],
    18,
    'NEST',
    'NEST'
  )
}

export const SupportTokensList: { [chainId: number]: Token }[] = [NEST]
