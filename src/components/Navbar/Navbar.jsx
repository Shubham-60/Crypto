import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

function Navbar() {

  const {setcurrency} = useContext(CoinContext)

  const currencyHandler = (event) => {
    switch (event.target.value){
      case "inr":
        setcurrency({
          name: "inr",
          symbol: "₹"
        })
        break;

      case "usd":
        setcurrency({
          name: "usd",
          symbol: "$"
        })
        break;

      case "eur":
        setcurrency({
          name: "eur",
          symbol: "€"
        })
        break;

      default:"usd"
        setcurrency({
          name: "usd",
          symbol: "$"
        })
        break;
    }
  }

  return (
    <div className='navbar'>
        <Link to="/">
          <img src={logo} alt="logo" className='logo' />
        </Link>
        <ul>
            <Link to = "/"><li>Home</li></Link>
            <li>Features</li>
            <li>Prizing</li>
            <li>Blog</li>
        </ul>
        <div className='navbar-btn'>
            <select className='currency' onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
            </select>
            <button>Sign Up <img src={icon}/></button>
        </div>
    </div>
  )
}

export default Navbar