import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import SignUpPage from './pages/user/SignUp'
import AccommodationPage from './pages/accommodation'
import CottageHousePage from './pages/accommodation/cottage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/accommodation" element={<AccommodationPage/>} />
          <Route path="/accommodation/the-cottage-house" element={<CottageHousePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
