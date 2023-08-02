import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';



export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </PersistGate>
  </Provider>
}

