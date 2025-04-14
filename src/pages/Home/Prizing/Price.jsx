import React, { useEffect, useState, useContext } from 'react';
import './Price.css';
import { CoinContext } from '../../../context/CoinContext';
import { Link } from 'react-router-dom';
function Price() {
    const [bitcoinData, setBitcoinData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCoins, setVisibleCoins] = useState(12); // Initially show 12 coins
    const { currency } = useContext(CoinContext);

    // Fetch Bitcoin data from the API
    function fetchcoin() {
        setLoading(true);
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-wDFZ1WGvofmkUttwASYFRQje' },
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency?.name || 'usd'}`, options)
            .then((res) => res.json())
            .then((data) => {
                setBitcoinData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching Bitcoin data:', err);
                setLoading(false);
            });
    }
    

    useEffect(() => {
        fetchcoin();
    }, [currency]);

    // Function to show more coins
    const showMoreCoins = () => {
        setVisibleCoins(prev => prev + 12);
    };

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className='main-price'>
            <h1 className='title'>Coins Prices</h1>
            <div className="price-container">
                {Array.isArray(bitcoinData) && bitcoinData.length > 0 ? (
                    bitcoinData.slice(0, visibleCoins).map((coin) => (
                        <Link 
                            to={`/coin/${coin.id}`} 
                            key={coin.id} 
                            className="bitcoin-card-link"
                        >
                            <div className="bitcoin-card">
                                <img src={coin.image} alt={`${coin.name} logo`} className="bitcoin-logo" />
                                <h2>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </h2>
                                <p>Current Price: {currency.symbol} {coin.current_price.toLocaleString()}</p>
                                <p>Market Cap: {currency.symbol} {coin.market_cap.toLocaleString()}</p>
                                <p>
                                    24h Change:{' '}
                                    <span className={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                </p>
                                <div className="view-details">View Details</div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
            
            {/* Show More Button */}
            {visibleCoins < bitcoinData.length && (
                <div className="show-more-container">
                    <button className="show-more-button" onClick={showMoreCoins}>
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}

export default Price;