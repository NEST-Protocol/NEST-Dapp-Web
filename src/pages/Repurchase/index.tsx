// import WalletAndTokenList from './WalletAndTokenList'
import Repurchase from './Repurchase'
// import Administrator from './Administrator'
// import QuotationFrequency from './QuotationFrequency'
import { Stack } from '@chakra-ui/react'

const Root = () => {
  return (
    <Stack p={'20px'} spacing={'20px'} direction={'row'}>
      <Repurchase />
      {/* <WalletAndTokenList />
      <Stack spacing={'20px'}>
        <Information />
        <Administrator />
        <QuotationFrequency />
      </Stack> */}
    </Stack>
  )
}

export default Root
