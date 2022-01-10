import Withdraw from './Withdraw'
import { Stack } from '@chakra-ui/react'

const Root = () => {
  return (
    <Stack p={'20px'} spacing={'20px'} direction={'row'}>
      <Withdraw />
    </Stack>
  )
}

export default Root
