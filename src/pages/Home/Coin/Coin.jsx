import React, { useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { CoinContext } from '../../../context/CoinContext'
import LineChart from '../../../components/LineChart/LineChart'


function Coin() {

  const {coinID} = useParams()

  const [coindata,setcoindata] = useState()
  const [coingraph,setcoingraph] = useState()

  const {currency} = useContext(CoinContext)

  function fetchcoindata(){
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-wDFZ1WGvofmkUttwASYFRQje'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options)
      .then(res => res.json())
      .then(res => setcoindata(res))
      .catch(err => console.error(err));
  }

  function fetchcoingraph(){
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-wDFZ1WGvofmkUttwASYFRQje'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setcoingraph(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchcoindata()
    fetchcoingraph()
  },[currency,coinID])

  if (coindata && coingraph && coingraph.prices){
    return (
    <div className='coin'>
      <div className='coinname'>

        <img src={coindata.image.large} alt='Coin image'/>
        <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>

      </div>
      <div className="coingraph">
        <LineChart prices={coingraph.prices}/>
      </div>
      <div className='coininfo'>
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol} {coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol} {coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
    )
  }
  else{
    return(
      <div className="spinner">
        <div className="spin">
          
        </div>
      </div>
    )
  }
  
}

export default Coin