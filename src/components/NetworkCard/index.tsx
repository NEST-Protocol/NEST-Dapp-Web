import { Badge } from '@chakra-ui/react'
import { useActiveWeb3React } from '../../hooks/web3'
import { CHAIN_INFO, SupportedChainId } from '../../constants/chains'
import { Tooltip, Image } from '@chakra-ui/react'
import tipImg from '../../assets/image/tips_icon.svg'

export const NetworkCard = () => {
  const { chainId, library } = useActiveWeb3React()
  console.log(chainId)
  const info = chainId ? CHAIN_INFO[chainId] : undefined

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <Badge color={'white'} variant={'ghost'} alignItems={'center'} display={'flex'}>
      {chainId !== SupportedChainId.MAINNET ? (
        <>
          <Image src={tipImg} width="14px" height="14px" marginRight="8px" />
          <Tooltip
            bg="#FFFFFF"
            color="#878787"
            padding="12px 15px"
            borderRadius="10px"
            fontSize="9px"
            label="This network is not supported, please switch the wallet network to The Ethereum Mainnet"
            placement="bottom-end"
            hasArrow>
            {info.label}
          </Tooltip>
        </>
      ) : (
        info.label
      )}
    </Badge>
  )
}

export default NetworkCard
