import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../api"

type BookingDetail = {
  id: number
  bookingDate: string
  flightId: number
  flightNumber: string
  estDepartureTime: string
  estArrivalTime: string
  customerId: number
  customerFirstName: string
  customerLastName: string
}

function BookingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api.get(`/flights/book/${id}`)
      .then((res) => {
        setBooking(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("No se pudo cargar el detalle de la reserva")
        setLoading(false)
      })
  }, [id])

  return (
    <div className="p-8">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate("/my-bookings")}
          className="mb-6 text-[#7c1fa0] text-sm font-medium hover:underline flex items-center gap-1"
        >
          ← Volver a Mis Reservas
        </button>

        <h1 className="text-3xl font-bold text-[#7c1fa0] mb-6">Detalle de Reserva</h1>

        {loading && <p className="text-gray-500">Cargando...</p>}

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {booking && (
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#7c1fa0] px-6 py-4">
              <p className="text-purple-200 text-sm">Reserva</p>
              <p className="text-white text-2xl font-bold">#{booking.id}</p>
            </div>

            {/* Body */}
            <div className="divide-y divide-purple-50">
              <Row label="Fecha de reserva" value={new Date(booking.bookingDate).toLocaleString()} />
              <Row label="Pasajero" value={`${booking.customerFirstName} ${booking.customerLastName}`} />
              <Row label="Número de vuelo" value={booking.flightNumber} highlight />
              <Row label="Salida" value={new Date(booking.estDepartureTime).toLocaleString()} />
              <Row label="Llegada" value={new Date(booking.estArrivalTime).toLocaleString()} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-[#7c1fa0]" : "text-[#1e1b4b]"}`}>
        {value}
      </span>
    </div>
  )
}

export default BookingDetail
