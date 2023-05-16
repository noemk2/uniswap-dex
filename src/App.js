import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ChainId, Fetcher, Token, WETH } from "@uniswap/sdk"

const setup = async () => {

  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()

  const MTKu = new Token(ChainId.MAINNET, '0x8f0BbaD11B3f59cc61C40f329Cdc404a58C160Fe', 18)
  const MATIC = new Token(ChainId.MAINNET, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18)

  const pair = await Fetcher.fetchPairData(MTKu, MATIC, provider)
  // const pair = await Fetcher.fetchPairData(MTKu, MATIC)
  ChainId

  console.log(MTKu)
  console.log(pair)
  // return { pair, MTKu }

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
