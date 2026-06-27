import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register/Register.tsx'
import Login from './pages/Login/Login.tsx'
import Search from './pages/Search/Search.tsx'
import MyBookings from './pages/MyBookings/MyBookings.tsx'
import BookingDetail from './pages/BookingDetail/BookingDetail.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { AuthLayout } from './components/AuthLayout.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthLayout />}>
          <Route path="/search" element={<Search />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/flights/book/:id"
            element={
              <ProtectedRoute>
                <BookingDetail />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
