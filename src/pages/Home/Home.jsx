import React,{useContext,useState,useEffect} from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';



function Home() {

  const {allcoin,currency,coinstatus} = useContext(CoinContext);
  const [displaycoin,setdisplaycoin] = useState([])
  const [input,setinput] = useState("")


  function handleChange(event){
    setinput(event.target.value)
    if (event.target.value === ""){
      setdisplaycoin(allcoin)
    }
  }

  async function handelSearch(event){
    event.preventDefault()
    const coins = await allcoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    // bitcoin and if we type bit we will get bitcoin also
    setdisplaycoin(coins)
  }

  useEffect(() => {
    setdisplaycoin(allcoin)
  },[allcoin])


  return (
    <div className='home'>
        <div className='hero'>
            <h1>Track Crypto 
                <br/>Prices with Ease
            </h1>
            <p>Get real-time updates, insights, and details on your favorite coins — all in one place. Sign up to explore more about cryptos</p>
            <form onSubmit={handelSearch}>

                <input type="text" placeholder='Search for Crypto' list='coinlist' onChange={handleChange} value={input} required/>
                
                <datalist id = "coinlist">
                  {allcoin.map((coin,index) => (
                    <option key={index} value={coin.name}/>
                  ))}
                </datalist>

                <button type='submit'>Search</button>

            </form>
        </div>
        <div className='cryp-table'>
          <div className='table-layout'>
            <p>#</p>
            <p>Coin</p>
            <p>Price</p>
            <p style={{textAlign:'center'}}>24H Change</p>
            <p className='market-cap'>Market Cap</p>
          </div>
          {coinstatus ? <div className="loading-spinner"></div> :
            displaycoin.slice(0,10).map((coin,index) => (
              <Link to={`/coin/${coin.id}`} className='table-layout' key={index}>
                <p>{coin.market_cap_rank}</p>
                <div>
                  <img src = {coin.image} alt='coin image'></img>
                  <p>{coin.name +" - "+coin.symbol}</p>
                </div>
                <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
                <p className={coin.price_change_percentage_24h > 0 ? "green":"red"}>
                  {Math.floor(coin.price_change_percentage_24h*100)/100 + " %"}
                </p>
                <p className='market-cap'>{currency.symbol} {coin.market_cap.toLocaleString()}</p>
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Home