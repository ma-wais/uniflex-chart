import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Uniflex from './pages/uniflex'
import './index.css'
import Home from './pages/Home'

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/uniflex' element={<Uniflex />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
