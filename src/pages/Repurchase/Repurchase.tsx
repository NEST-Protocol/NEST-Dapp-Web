import {
  Link,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Skeleton,
  Tooltip,
  Input,
  Flex
} from '@chakra-ui/react';
// import { FC } from 'react'
// import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
// import { useActiveWeb3React } from '../../hooks/web3'
// import { useActiveChannelInfo } from '../../hooks/useActiveChannelInfo'
// import { isAddress, shortenAddress } from '../../utils'
// import { PROCESSING } from '../../constants/misc'
// import { CHAIN_INFO } from '../../constants/chains'
// import { formatNumber } from '../../utils/bignumberUtil'
// import { PUSD_ADDRESS } from '../../constants/addresses'
// import { useToken } from '../../hooks/Tokens'

const Repurchase = () => {
  // const { chainId } = useActiveWeb3React()
  // const { info, status } = useActiveChannelInfo()
  // const { symbol: miningTokenSymbol } = useToken(info?.reward)

  return (
    <Stack
      bg={'white'}
      w={'full'}
      borderRadius={'20px'}
      p={'20px'}
      height="700px"
    >
      {/* <Text fontWeight={'bold'}>Information</Text> */}
      <Flex height="100%" justifyContent="center" alignItems="center" direction="column">
        <Wrap justify={'space-between'}>
          <Input variant="filled" placeholder="Input Quantity" width="330px" />
        </Wrap>
        <Text>Blance: 200,000,000 NEST</Text>
        <Wrap justify={'space-between'}>
          <Wrap direction="column">
            <Text>Repurchasable NEST Quantity</Text>
            <Text>300,000 NEST</Text>
          </Wrap>
          <Wrap direction="column">
            <Text>Current Buyback Price</Text>
            <Text>0.000004 ETH</Text>
          </Wrap>
        </Wrap>
      </Flex>
    </Stack>
  );
};

export default Repurchase;
