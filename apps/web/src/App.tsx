import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthorizedAdminRoute } from './hooks/AuthProvider'
import AccommodationPage from './pages/accommodation'
import CottageHousePage from './pages/accommodation/cottage'
import DashboardPage from './pages/admin'
import AdminLoginPage from './pages/admin/auth/Auth'
import { default as AdminBookingIndexPage } from './pages/admin/booking'
import AdminBookingEditPage from './pages/admin/booking/edit'
import AdminBookingViewPage from './pages/admin/booking/view'
import AdminContactPage from './pages/admin/contact'
import AdminContactEditPage from './pages/admin/contact/edit'
import AdminContactViewPage from './pages/admin/contact/view'
import AdminCustomerIndexPage from './pages/admin/customer'
import AdminCustomerEditPage from './pages/admin/customer/edit'
import AdminCustomerViewPage from './pages/admin/customer/view'
import AdminPackageIndexPage from './pages/admin/package'
import AdminPackageCreatePage from './pages/admin/package/create'
import AdminPackageViewPage from './pages/admin/package/view'
import AdminRoomPage from './pages/admin/room'
import AdminRoomCategoryPage from './pages/admin/room/category'
import AdminRoomCreatePage from './pages/admin/room/create'
import AdminRoomViewPage from './pages/admin/room/view'
import BookingPage from './pages/booking'
import SearchRoomPage from './pages/booking/search'
import { ContactPage } from './pages/contact'
import HomePage from './pages/home'
import SignUpPage from './pages/user/SignUp'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchRoomPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/accommodation/the-cottage-house" element={<CottageHousePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin management */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AuthorizedAdminRoute>
                <DashboardPage />
              </AuthorizedAdminRoute>
            }
          />

          {/* Booking management */}
          <Route
            path="/admin/booking"
            element={
              <AuthorizedAdminRoute>
                <AdminBookingIndexPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/booking/edit/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminBookingEditPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/booking/view/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminBookingViewPage />
              </AuthorizedAdminRoute>
            }
          />

          {/* Room management */}
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

          {/* Customer management */}
          <Route
            path="/admin/customer"
            element={
              <AuthorizedAdminRoute>
                <AdminCustomerIndexPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/customer/edit/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminCustomerEditPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/customer/view/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminCustomerViewPage />
              </AuthorizedAdminRoute>
            }
          />

          {/* Package management */}
          <Route
            path="/admin/package"
            element={
              <AuthorizedAdminRoute>
                <AdminPackageIndexPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/package/create"
            element={
              <AuthorizedAdminRoute>
                <AdminPackageCreatePage mode={'create'} />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/package/view/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminPackageViewPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/package/edit/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminPackageCreatePage mode={'edit'} />
              </AuthorizedAdminRoute>
            }
          />

          {/* Contact management */}
          <Route
            path="/admin/contact"
            element={
              <AuthorizedAdminRoute>
                <AdminContactPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/contact/edit/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminContactEditPage />
              </AuthorizedAdminRoute>
            }
          />
          <Route
            path="/admin/contact/view/:id"
            element={
              <AuthorizedAdminRoute>
                <AdminContactViewPage />
              </AuthorizedAdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
