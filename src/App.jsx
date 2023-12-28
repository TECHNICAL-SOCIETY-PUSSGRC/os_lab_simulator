import { Route, Routes } from 'react-router-dom'
import { HomePage, DocsPage, SimulatorPage, AboutPage } from './pages'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/docs' element={<DocsPage/>} />
        <Route path='/simulator' element={<SimulatorPage/>} />
        <Route path='/about' element={<AboutPage/>} />
      </Routes>
      <Analytics />
    </div>
  )
}

export default App
