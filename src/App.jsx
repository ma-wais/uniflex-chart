import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Uniflex from './pages/uniflex'
import './index.css'
function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Uniflex />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
