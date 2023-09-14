import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Docs from './components/Docs'
import Simulator from './components/Simulator'
import About from './components/About'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (<div>


        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/docs' element={<Docs/>} />
          <Route path='/simulator' element={<Simulator/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      



     

      
    </div>
  )
}

export default App
