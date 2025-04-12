import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import Coin from './pages/Home/Coin/Coin';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/Crypto' element={<Home/>} />
        <Route path='/coin/:coinID' element={<Coin/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App