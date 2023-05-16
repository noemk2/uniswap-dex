import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { SupportedChainId, Token } from '@uniswap/sdk-core'


const setup = async () => {

  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()

  const NEO = new Token(SupportedChainId.CELO_ALFAJORES, '0xb9095b079195690907A40399F7F9A7bb9F9F460C', 18, 'NEO', 'Neo tokens')

  const CELO = new Token(SupportedChainId.CELO_ALFAJORES, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9', 18, "CELO", "Celo Native asset")

}


function App() {
  const [loading, setLoading] = useState(true)

  const [pair, setPair] = useState()
  const [MTKu, setMTku] = useState()

  useEffect(() => {
    const variables = setup()
    // setPair(variables.pair)
    // setMTku(variables.MTKu)

  }, [])

  // console.log(pair)
  // console.log(MTKu)

  return <>{loading ? "Cargango... " : <p>Hola mundo </p>}</>;

}

export default App;
