import { ChakraProvider } from '@chakra-ui/react'
import Sheet from '../components/Sheet'
import Charts from '../components/Charts'

function App() {
  return (
    <ChakraProvider>
      <Sheet/>
    </ChakraProvider>
  )
}

export default App
