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
  Flex,
  Button
} from '@chakra-ui/react';

const Withdraw = () => {
  return (
    <Stack
      bg={'white'}
      w={'full'}
      borderRadius={'20px'}
      p={'20px'}
      height="700px"
    >
      <Flex height="100%" justifyContent="center" alignItems="center" direction="column">
      <Text color="#878787" fontSize="17px" marginBottom="31px">NEST</Text>
      <Text color="#000" fontSize="34px" marginBottom="33px">300,000,000</Text>
      <Button>
          withdraw
        </Button>
      </Flex>
    </Stack>
  )
}

export default Withdraw
