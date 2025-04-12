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
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:coinID' element={<Coin/>} />
        <Route path='/features' element={<div>Features</div>} />
        <Route path='/prizing' element={<div>Prizing</div>} />
        <Route path='/blog' element={<div>Blog</div>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App