import { Route, Routes } from 'react-router-dom'
import { HomePage, DocsPage, SimulatorPage, AboutPage, SignInPage, SignUpPage } from './pages'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <HomePage/> } />
        <Route path='/docs' element={ <DocsPage/> } />
        <Route path='/simulator' element={ <SimulatorPage/> } />
        <Route path='/about' element={ <AboutPage/> } />
        <Route path='/sign-in' element={ <SignInPage/> } />
        <Route path='/sign-up' element={ <SignUpPage/> } />
      </Routes>
    </div>
  )
}

export default App
