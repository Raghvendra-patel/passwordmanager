import React from 'react'
import Header from './Components/Header'
import Crud from './Components/Crud'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'

 const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/ >} />
          <Route path='/yourtask' element={<Crud/ >} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App