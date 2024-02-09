import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthorizedAdminRoute } from './hooks/AuthProvider'
import AccommodationPage from './pages/accommodation'
import CottageHousePage from './pages/accommodation/cottage'
import DashboardPage from './pages/admin'
import AdminLoginPage from './pages/admin/auth/Auth'
import AdminRoomPage from './pages/admin/room'
import AdminRoomCategoryPage from './pages/admin/room/category'
import AdminRoomCreatePage from './pages/admin/room/create'
import AdminRoomViewPage from './pages/admin/room/view'
import HomePage from './pages/home'
import SignUpPage from './pages/user/SignUp'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/accommodation/the-cottage-house" element={<CottageHousePage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AuthorizedAdminRoute>
                <DashboardPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/room"
            element={
              <AuthorizedAdminRoute>
                <AdminRoomPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/room/create"
            element={
              <AuthorizedAdminRoute>
                <AdminRoomCreatePage mode={'create'} />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/room/view/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminRoomViewPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/room/edit/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminRoomCreatePage mode={'edit'} />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/room/category"
            element={
              <AuthorizedAdminRoute>
                <AdminRoomCategoryPage />
              </AuthorizedAdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
