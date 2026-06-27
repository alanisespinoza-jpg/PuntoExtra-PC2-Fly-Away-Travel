import { useState } from "react"
import api from "../../api"
import FlightTable from "./Components/FlightTable"
import SearchForm from "./Components/SearchForm"

function Search() {
  const [flights, setFlights] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [bookingMessage, setBookingMessage] = useState('')
  const [bookingError, setBookingError] = useState('')

  const handleSearch = async (flightNumber: string, airlineName: string, dateFrom: string, dateTo: string) => {
    const response = await api.get("/flights/search", {
      params: {
        flightNumber,
        airlineName,
        estDepartureTimeFrom: dateFrom ? new Date(dateFrom).toISOString() : undefined,
        estDepartureTimeTo: dateTo ? new Date(dateTo).toISOString() : undefined,
      }
    })
    setFlights(response.data.items)
    setHasSearched(true)
    setBookingMessage('')
    setBookingError('')
  }

  const handleBook = async (flightId: number) => {
    try {
      const response = await api.post('/flights/book', { flightId })
      const newId = response.data.id

      const stored = JSON.parse(localStorage.getItem('bookingIds') || '[]')
      stored.push(newId)
      localStorage.setItem('bookingIds', JSON.stringify(stored))

      setBookingMessage(`¡Reserva exitosa! Tu ID de reserva es: ${newId}`)
      setBookingError('')
    } catch (error: any) {
      if (error.response?.status === 401) {
        setBookingError('Inicia sesión para reservar tus vuelos')
      } else {
        setBookingError(error.response?.data?.detail || 'Error al reservar el vuelo')
      }
      setBookingMessage('')
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#7c1fa0] mb-6">Buscar vuelos</h1>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
          <SearchForm onSearch={handleSearch} />
          {bookingMessage && (
            <p className="mt-4 text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              {bookingMessage}
            </p>
          )}
          {bookingError && (
            <p className="mt-4 text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {bookingError}
            </p>
          )}
          {hasSearched && <FlightTable flights={flights} onBook={handleBook} />}
        </div>
      </div>
    </div>
  )
}

export default Search