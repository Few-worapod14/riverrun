import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import SignUpPage from './pages/user/SignUp'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
