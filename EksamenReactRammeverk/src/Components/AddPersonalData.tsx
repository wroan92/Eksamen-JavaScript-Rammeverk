import { useState, useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { toast } from "react-toastify";

const AddPersonalData: React.FC = () => {
  const [vekt, setVekt] = useState<number>(0);
  const [høyde, setHøyde] = useState<number>(0);
  const [dato, setDato] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const apiDataContext = useContext(ApiDataContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const personalData = { vekt, høyde, dato };

    if (apiDataContext?.postPersonalData) {
      try {
        const success = await apiDataContext.postPersonalData(personalData);

        if (success) {
          toast.success("Personlige data er oppdatert!");
        } else {
          toast.error(
            "Kunne ikke legge til personlige data. Kontakt administrator eller prøv igjen senere."
          );
        }
      } catch (error) {
        console.error("Feil ved posting av personlige data:", error);
        toast.error("En feil oppstod under lagring av data.");
      }
    } else {
      toast.error("API-kontekst ikke tilgjengelig.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className={`${
          showForm
            ? "bg-red-500 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded mb-4`}
      >
        {showForm ? "Lukk Skjema" : "Legg Til Personlige Data"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="vekt"
            >
              Vekt:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vekt"
              value={vekt}
              onChange={(e) => setVekt(Number(e.target.value))}
            >
              <option value="0">Velg vekt</option>
              {Array.from({ length: 231 }, (_, i) => (
                <option key={i} value={i + 20}>
                  {i + 20} kg
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="høyde"
            >
              Høyde:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="høyde"
              value={høyde}
              onChange={(e) => setHøyde(Number(e.target.value))}
            >
              <option value="0">Velg høyde</option>
              {Array.from({ length: 141 }, (_, i) => (
                <option key={i} value={i + 100}>
                  {i + 100} cm
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dato"
            >
              Dato:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dato"
              type="date"
              value={dato}
              onChange={(e) => setDato(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Lagre Data
          </button>
        </form>
      )}
    </div>
  );
};

export default AddPersonalData;
