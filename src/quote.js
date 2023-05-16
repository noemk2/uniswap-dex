import { ethers } from 'ethers'
import { computePoolAddress } from '@uniswap/v3-sdk'
import { toReadableAmount, fromReadableAmount } from './conversion'
// import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'

import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'


const QUOTER_CONTRACT_ADDRESS = '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8'
const POOL_FACTORY_CONTRACT_ADDRESS = '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc'

export async function quote(
    tokenA,
    tokenB,
    feeC,
    amountIn,
    provider
) {

    const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        Quoter.abi,
        provider
    )

    console.log(provider)

    const poolConstants = await getPoolConstants(tokenA, tokenB, feeC, provider)

    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        poolConstants.token0,
        poolConstants.token1,
        poolConstants.fee,
        fromReadableAmount(
            amountIn,
            tokenA.decimals
        ).toString(),
        0
    )
    console.log(quotedAmountOut)

    return toReadableAmount(quotedAmountOut, tokenB.decimals)
}

async function getPoolConstants(
    tokenA,
    tokenB,
    feeC,
    provider
) {
    const currentPoolAddress = computePoolAddress({
        factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
        tokenA: tokenA,
        tokenB: tokenB,
        fee: feeC,
    })

    const poolContract = new ethers.Contract(
        currentPoolAddress,
        IUniswapV3PoolABI.abi,
        provider
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

export default quote
