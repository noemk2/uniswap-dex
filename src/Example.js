import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { SupportedChainId, Token } from '@uniswap/sdk-core'
import { quote } from "./quote";
import { FeeAmount } from '@uniswap/v3-sdk'



const Example = () => {
    const [outputAmount, setOutputAmount] = useState()
    const [provider, setProvider] = useState()
    const amount = 10
    const symbol = "NEO"
    const outSymbol = "CELO"


    useEffect(() => {
        const fetchData = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // setProvider(new ethers.providers.Web3Provider(window.ethereum))
            const signer = provider.getSigner()
            setProvider(signer)
            // provider.getSigner

        }
        fetchData()
    }, [])




    const onQuote = useCallback(async () => {
        const NEO = new Token(SupportedChainId.CELO_ALFAJORES, '0xb9095b079195690907A40399F7F9A7bb9F9F460C', 18, 'NEO', 'Neo tokens')

        const CELO = new Token(SupportedChainId.CELO_ALFAJORES, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9', 18, "CELO", "Celo Native asset")

        console.log(provider)
        setOutputAmount(await quote(NEO, CELO, FeeAmount.HIGH, 10, provider))
        // console.log(outputAmount)

    }, [])


    return (
        <div className="App">
            <h3>{`Quote input amount: ${amount} ${symbol}`}</h3>
            <h3>{`Quote output amount: ${outputAmount} ${outSymbol}`}</h3>
            <button onClick={onQuote}>
                <p>Quote</p>
            </button>
        </div>
    )
}

export default Example