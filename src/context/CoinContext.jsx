import React, { createContext , useEffect, useState} from 'react'

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    let [allcoin, setallcoin] = useState([])
    let [currency,setcurrency] = useState({
        name: "usd",
        symbol: "$"
    })
    let [coinstatus,setcoinstatus] = useState(true)
    async function fetchcoin(){
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-wDFZ1WGvofmkUttwASYFRQje'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => {
                setallcoin(res)
                setcoinstatus(false)
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        fetchcoin()
    }, [currency])

    // use them in any component
    const contextValue = {
        allcoin, currency ,setcurrency,coinstatus
    }


    return (
        <CoinContext.Provider value = {contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}


export default CoinContextProvider