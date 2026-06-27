import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../../api"

type BookingRow = {
  id: number
  flightNumber: string
  airlineName: string
  estDepartureTime: string
}

function MyBookings() {
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchBookings = async () => {
      const ids: number[] = JSON.parse(localStorage.getItem('bookingIds') || '[]')
      if (ids.length === 0) {
        setLoading(false)
        return
      }

      const results = await Promise.all(
        ids.map(async (id) => {
          const booking = await api.get(`/flights/book/${id}`).then((r) => r.data)
          const flight = await api.get(`/flights/${booking.flightId}`).then((r) => r.data)
          return {
            id: booking.id,
            flightNumber: booking.flightNumber,
            airlineName: flight.airlineName,
            estDepartureTime: booking.estDepartureTime,
          }
        })
      )
      setBookings(results)
      setLoading(false)
    }

    fetchBookings()
  }, [])

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#7c1fa0] mb-6">Mis Reservas</h1>

        {loading && (
          <p className="text-gray-500">Cargando reservas...</p>
        )}

        {!loading && bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-12 text-center">
            <p className="text-4xl mb-3">✈️</p>
            <p className="text-gray-600 font-medium">¡Aún no tienes reservas!</p>
            <p className="text-sm text-gray-400 mt-1">
              Busca un vuelo y haz tu primera reserva.
            </p>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#7c1fa0] text-white">
                  <th className="px-4 py-3 rounded-tl-lg">Número de vuelo</th>
                  <th className="px-4 py-3">Aerolínea</th>
                  <th className="px-4 py-3">Fecha de salida</th>
                  <th className="px-4 py-3 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-[#7c1fa0]">
                      {booking.flightNumber}
                    </td>
                    <td className="px-4 py-3 text-[#1e1b4b]">
                      {booking.airlineName}
                    </td>
                    <td className="px-4 py-3 text-[#1e1b4b]">
                      {new Date(booking.estDepartureTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/flights/book/${booking.id}`}
                        className="text-xs font-semibold text-[#7c1fa0] border border-[#7c1fa0] px-3 py-1 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => navigate('/search')}
          className="mt-6 bg-[#b91c5a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a01850] transition-colors"
        >
          Buscar más vuelos
        </button>
      </div>
    </div>
  )
}

export default MyBookings
