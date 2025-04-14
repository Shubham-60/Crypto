import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import Coin from './pages/Home/Coin/Coin';
import Footer from './components/Footer/Footer';
import Price from './pages/Home/Prizing/Price';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:coinID' element={<Coin/>} />
        <Route path="/price" element={<Price />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App