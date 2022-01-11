import { Route, Routes, NavLink, Navigate } from 'react-router-dom'
import Repurchase from './pages/Repurchase'
import Withdraw from './pages/Withdraw'
import { Button, Spacer, Stack, Flex, Box } from '@chakra-ui/react'
import { Logo } from './components/Logo'
import Web3Status from './components/Web3Status'
import Web3ReactManager from './components/Web3ReactManager'
import NetworkCard from './components/NetworkCard'
import './App.css'
import * as buffer from 'buffer'
(window as any).Buffer = buffer.Buffer

export const App = () => {
  return (
    <Web3ReactManager>
      <Stack spacing={0} w={'full'} h={'full'} alignItems={'center'} pb={'20px'}>
        <Header />
        <Content />
      </Stack>
    </Web3ReactManager>
  )
}

const Header = () => {
  return (
    <Stack w={'container.xl'} h={'60px'} direction={'row'} justifyContent={'center'} alignItems={'center'} mb={'6px'}>
      <Flex color="#fff" fontWeight={600}>
        <Box marginRight="40px"><NavLink to="/repurchase" className={d => d.isActive ? 'nav-active' : ''}>REPURCHASE</NavLink></Box>
        <Box><NavLink to="/withdraw" className={d => d.isActive ? 'nav-active' : ''}>NESTNODE</NavLink></Box>
      </Flex>
      <Spacer />
      <Button
        position={'absolute'}
        variant={'ghost'}
        onClick={() => {
          const w = window.open('about:blank')
          // @ts-ignore
          w.location.href = 'https://nestprotocol.org/'
        }}
      >
        <Logo w={'88px'} h={'28px'} />
      </Button>
      <Spacer />
      <NetworkCard />
      <Web3Status />
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack background={'rgba(255,255,255, 0.5)'} borderRadius={'20px'} w={'container.xl'} h={'full'}>
      <Routes>
        <Route path="/repurchase" element={<Repurchase />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/" element={<Navigate to="/repurchase" />} />
      </Routes>
    </Stack>
  )
}
