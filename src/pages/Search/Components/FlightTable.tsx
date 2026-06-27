type Flight = {
  id: number;
  airlineName: string;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  availableSeats: number;
};

function SeatsBadge({ seats }: { seats: number }) {
  if (seats === 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        Sin asientos
      </span>
    );
  }
  if (seats <= 10) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        {seats} asientos
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      {seats} asientos
    </span>
  );
}

function FlightTable({
  flights,
  onBook,
}: {
  flights: Flight[];
  onBook: (flightId: number) => void;
}) {
  const isAuthenticated = !!localStorage.getItem("token");

  if (flights.length === 0) {
    return (
      <div className="text-center mt-10 py-8">
        <p className="text-4xl mb-2">🔍</p>
        <p className="text-gray-500">No se encontraron vuelos con esos criterios.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-[#7c1fa0] text-white">
            <th className="px-4 py-3 rounded-tl-lg">Número</th>
            <th className="px-4 py-3">Aerolínea</th>
            <th className="px-4 py-3">Salida</th>
            <th className="px-4 py-3">Llegada</th>
            <th className="px-4 py-3">Asientos</th>
            {isAuthenticated && (
              <th className="px-4 py-3 rounded-tr-lg">Acción</th>
            )}
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr
              key={flight.id}
              className={
                index % 2 === 0 ? "bg-white" : "bg-purple-50"
              }
            >
              <td className="px-4 py-3 font-semibold text-[#7c1fa0]">
                {flight.flightNumber}
              </td>
              <td className="px-4 py-3 text-[#1e1b4b]">{flight.airlineName}</td>
              <td className="px-4 py-3 text-[#1e1b4b]">
                {new Date(flight.estDepartureTime).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-[#1e1b4b]">
                {new Date(flight.estArrivalTime).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <SeatsBadge seats={flight.availableSeats} />
              </td>
              {isAuthenticated && (
                <td className="px-4 py-3">
                  <button
                    onClick={() => onBook(flight.id)}
                    className="bg-[#b91c5a] text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-[#a01850] transition-colors"
                  >
                    Reservar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightTable;
