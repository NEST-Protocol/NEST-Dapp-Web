import { Stack, Text, Input, Flex, Box, Button, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { useRedeemingContract, usePricingContract, useNestContract } from '../../hooks/useContract'
import { formatNumber, parseToBigNumber } from '../../utils/bignumberUtil'
import {
  NEST_REDEEMING_ADDRESS,
  NEST_PRICE_FACADE,
  NEST_ADDRESS,
  NEST_LEDGER_ADDRESS
} from '../../constants/addresses'
import { useActiveWeb3React } from '../../hooks/web3'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { useToken } from '../../hooks/Tokens'
import Web3Status from '../../components/Web3Status'

const Repurchase = () => {
  const toast = useToast()
  const { chainId } = useActiveWeb3React()
  const contract = useRedeemingContract(NEST_REDEEMING_ADDRESS[chainId ?? 1], true)
  const priceContract = usePricingContract(NEST_PRICE_FACADE[chainId ?? 1], true)
  const nestContract = useNestContract(NEST_LEDGER_ADDRESS[chainId ?? 1], true)
  const { balanceOf, approve, approveStatus } = useToken(NEST_ADDRESS[chainId ?? 1])
  const [amount, setAmount] = useState<any>('')
  const [balance, setBalance] = useState('0')
  const [repurchaseable, setRepurchaseable] = useState('-')
  const [buyBack, setBuyBack] = useState('-')
  const { account } = useWeb3React()
  const [loading, setLoading] = useState(false)

  const getBalance = useCallback(async () => {
    if (!account) {
      setBalance('0')
      return
    }
    setBalance(parseToBigNumber(await balanceOf(account)).toString())
  }, [account, balanceOf])

  const init = useCallback(() => {
    let quotaOf: string, latestPrice: string, totalETHRewards: string
    if (!contract) {
      setRepurchaseable('-')
      setBuyBack('-')
    }
    contract
      ?.quotaOf(NEST_ADDRESS[chainId ?? 1])
      .then((res: any) => {
        quotaOf = parseToBigNumber(res).shiftedBy(-18).toString()
      })
      .then(() => {
        priceContract
          ?.latestPrice(NEST_ADDRESS[chainId ?? 1])
          .then((res: any) => {
            setBuyBack(formatNumber(parseToBigNumber(res.price).shiftedBy(-18)))
            latestPrice = parseToBigNumber(res.price).shiftedBy(-18).toString()
          })
          .then(() => {
            nestContract?.totalETHRewards(NEST_ADDRESS[chainId ?? 1]).then((res: any) => {
              totalETHRewards = parseToBigNumber(res).shiftedBy(-18).toString()
              const repurchase =
                +latestPrice * +totalETHRewards < +quotaOf
                  ? (+latestPrice * +totalETHRewards).toString()
                  : quotaOf
              setRepurchaseable(repurchase)
            })
          })
      })

    getBalance()
  }, [chainId, contract, getBalance, nestContract, priceContract])

  useEffect((): any => {
    init()
  }, [account, chainId, contract, init, priceContract])

  useEffect(() => {
    approveStatus === 'SUCCESS' && window.sessionStorage.setItem('approved', '1')
  }, [approveStatus])

  const handleChange = (e: any) => {
    let value = e.target.value
    function formatNum(obj: any) {
      obj = obj.replace(/[^\d.]/g, '')
      obj = obj.replace(/\.{2,}/g, '.')
      obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      if (obj.indexOf('.') < 0 && obj !== '') {
        obj = parseFloat(obj)
      }
      return obj
    }
    setAmount(formatNum(value))
  }

  const handleApprove = async () => {
    if (!chainId) return
    await approve(
      NEST_REDEEMING_ADDRESS[chainId],
      parseToBigNumber(Math.pow(2, 64)).shiftedBy(18).toFixed(0)
    )
  }

  const doRedeem = () => {
    if (chainId !== 1) {
      window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
      })
      return
    }
    setLoading(true)
    contract
      ?.redeem(
        NEST_ADDRESS[chainId ?? 1],
        parseToBigNumber(amount).shiftedBy(18).toFixed(0),
        account,
        {
          value: parseToBigNumber(0.001).shiftedBy(18).toFixed(0)
        }
      )
      .then((tx: TransactionResponse) => {
        console.log(tx)
        tx.wait(1)
          .then((receipt: TransactionReceipt) => {
            toast({
              description: 'Successful transaction',
              status: 'success'
            })
            init()
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

  return (
    <Stack bg={'white'} w={'full'} borderRadius={'20px'} p={'20px'} height="700px">
      <Flex
        marginX="auto"
        width="572px"
        height="100%"
        justifyContent="center"
        alignItems="center"
        direction="column">
        <Input
          variant="filled"
          placeholder="Input Quantity"
          marginBottom="16px"
          onChange={handleChange}
          value={amount}
        />
        <Box width="100%" textAlign="right" marginBottom="26px">
          <Text fontSize="15px" color="#878787" fontWeight={600}>
            Balance: {formatNumber(balance)} NEST
          </Text>
        </Box>
        <Box marginBottom="38px">
          {account ? (
            window.sessionStorage.getItem('approved') === '1' ? (
              <Button
                onClick={doRedeem}
                disabled={
                  !amount ||
                  +amount > +balance ||
                  +amount > +repurchaseable ||
                  +amount <= 0 ||
                  loading
                }
                width="220px"
                isLoading={loading}
                loadingText={'Repurchase'}>
                Repurchase
              </Button>
            ) : (
              <Button
                width="220px"
                onClick={handleApprove}
                isLoading={approveStatus === 'PROCESSING'}
                loadingText={'Approving'}>
                Approve
                {approveStatus === 'SUCCESS' && <> Success</>}
                {approveStatus === 'ERROR' && <> Error</>}
              </Button>
            )
          ) : (
            <Web3Status />
          )}
        </Box>
        <Flex width="100%" justify={'space-between'} fontWeight={600}>
          <Flex direction="column">
            <Text fontSize="15px" color="#878787">
              Repurchasable NEST Quantity
            </Text>
            <Text fontSize="17px" color="#000">
              {formatNumber(repurchaseable)} NEST
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontSize="15px" color="#878787">
              Current Buyback Price
            </Text>
            <Text fontSize="17px" color="#000">
              {buyBack} NEST/ETH
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  )
}

export default Repurchase
