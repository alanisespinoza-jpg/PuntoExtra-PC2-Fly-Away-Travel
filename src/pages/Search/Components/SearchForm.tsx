import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type SearchFormProps = {
  onSearch: (flightNumber: string, airlineName: string, dateFrom: string, dateTo: string) => void
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [flightNumber, setFlightNumber] = useState('')
  const [airlineName, setAirlineName] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(flightNumber, airlineName, dateFrom, dateTo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-end flex-wrap">
      <div className="flex flex-col flex-1 gap-1.5">
        <Label htmlFor="flightNumber">Número de vuelo</Label>
        <Input
          id="flightNumber"
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="Ej: LA101"
          className="border-purple-200 focus-visible:ring-[#7c1fa0]"
        />
      </div>

      <div className="flex flex-col flex-1 gap-1.5">
        <Label htmlFor="airlineName">Aerolínea</Label>
        <Input
          id="airlineName"
          type="text"
          value={airlineName}
          onChange={(e) => setAirlineName(e.target.value)}
          placeholder="Ej: LATAM"
          className="border-purple-200 focus-visible:ring-[#7c1fa0]"
        />
      </div>

      <div className="flex flex-col flex-1 gap-1.5">
        <Label htmlFor="dateFrom">Fecha de salida</Label>
        <Input
          id="dateFrom"
          type="datetime-local"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border-purple-200 focus-visible:ring-[#7c1fa0]"
        />
      </div>

      <div className="flex flex-col flex-1 gap-1.5">
        <Label htmlFor="dateTo">Fecha de llegada</Label>
        <Input
          id="dateTo"
          type="datetime-local"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border-purple-200 focus-visible:ring-[#7c1fa0]"
        />
      </div>

      <Button
        type="submit"
        className="bg-[#b91c5a] hover:bg-[#a01850] text-white px-6"
      >
        Buscar
      </Button>
    </form>
  )
}

export default SearchForm
