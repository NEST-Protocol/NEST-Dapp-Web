import { Stack, Text, Flex, Button, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { useNNIncomeContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks/web3'
import { formatNumber, parseToBigNumber } from '../../utils/bignumberUtil'
import { NEST_NNINCOME_ADDRESS } from '../../constants/addresses'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import Web3Status from '../../components/Web3Status'

const Withdraw = () => {
  const toast = useToast()
  const { chainId } = useActiveWeb3React()
  const contract = useNNIncomeContract(NEST_NNINCOME_ADDRESS[chainId ?? 1], true)
  const { account } = useWeb3React()
  const [earnNest, setEarnNest] = useState('0')
  const [loading, setLoading] = useState(false)

  const getEarned = useCallback(() => {
    if (!contract) {
      setEarnNest('0')
    }
    contract?.earned(account).then((res: any) => {
      setEarnNest(formatNumber(parseToBigNumber(res).shiftedBy(-18)))
    })
  }, [account, contract])

  const doWithdraw = () => {
    if (chainId !== 1) {
      window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
      })
      return
    }
    setLoading(true)
    contract
      ?.claim()
      .then((tx: TransactionResponse) => {
        console.log(tx)
        tx.wait(1)
          .then((receipt: TransactionReceipt) => {
            toast({
              description: 'Successful transaction',
              status: 'success'
            })
            getEarned()
            setLoading(false)
          })
          .catch((err: any) => {
            toast({
              description: err.message,
              status: 'error'
            })
            setLoading(false)
          })
      })
      .catch((err: any) => {
        toast({
          description: err.message,
          status: 'error'
        })
        setLoading(false)
      })
  }

  useEffect((): any => {
    getEarned()
  }, [account, getEarned])

  return (
    <Stack bg={'white'} w={'full'} borderRadius={'20px'} p={'20px'} height="700px">
      <Flex height="100%" justifyContent="center" alignItems="center" direction="column">
        <Text color="#878787" fontSize="17px" marginBottom="31px" fontWeight={600}>
          NEST
        </Text>
        <Text color="#000" fontSize="34px" marginBottom="33px" fontWeight={600}>
          {earnNest}
        </Text>
        {account ? (
          <Button
            onClick={doWithdraw}
            disabled={+earnNest <= 0 || loading}
            width="220px"
            isLoading={loading}
            loadingText={'Withdraw'}>
            Withdraw
          </Button>
        ) : (
          <Web3Status />
        )}
      </Flex>
    </Stack>
  )
}

export default Withdraw
