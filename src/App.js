import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { computePoolAddress } from '@uniswap/v3-sdk'
// import { ChainId, Fetcher, Token, WETH } from "@uniswap/sdk"
import { SupportedChainId, Token } from '@uniswap/sdk-core'
import { toReadableAmount, fromReadableAmount } from './conversion'
// import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'

QUOTER_CONTRACT_ADDRESS = '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8'
POOL_FACTORY_CONTRACT_ADDRESS = '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc'

const setup = async () => {

  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()

  const NEO = new Token(SupportedChainId.CELO_ALFAJORES, '0xb9095b079195690907A40399F7F9A7bb9F9F460C', 18, 'NEO', 'Neo tokens')

  const CELO = new Token(SupportedChainId.CELO_ALFAJORES, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9', 18, "CELO", "Celo Native asset")



}

const getPoolConstants = async () => {

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  )
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  return {
    token0,
    token1,
    fee,
  }
}


const quote = async () => {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  const poolConstants = await getPoolConstants()

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    ).toString(),
    0
  )




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
