import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api"

function Navbar() {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('token')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/users/current')
        .then((res) => setUserName(res.data.username))
        .catch(() => setUserName(''))
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('bookingIds')
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-[#7c1fa0] to-[#b91c5a] text-white px-6 py-3 flex items-center justify-between shadow-md shrink-0 z-10">
      <Link
        to="/search"
        className="font-bold text-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <span>✈</span>
        <span>Fly Away</span>
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated && userName && (
          <span className="text-purple-200 text-sm font-medium">
            Hola, {userName}
          </span>
        )}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white text-[#7c1fa0] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors"
          >
            Cerrar sesión
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-[#7c1fa0] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors"
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
