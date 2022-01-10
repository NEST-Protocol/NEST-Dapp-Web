import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { createGlobalStyle } from 'styled-components'
import 'focus-visible/dist/focus-visible'
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Index from './components/Background'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'
import { NetworkContextName } from './constants/misc'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Montserrat", serif;
  }

  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Updaters = () => {
  return <></>
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <ChakraProvider theme={theme}>
              <GlobalStyle />
              <Updaters />
              <Index />
              <App />
            </ChakraProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
