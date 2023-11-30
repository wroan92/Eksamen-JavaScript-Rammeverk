import React, { useState, useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { toast } from "react-toastify";

const AddPersonalData: React.FC = () => {
  const [vekt, setVekt] = useState("");
  const [høyde, setHøyde] = useState("");
  const [showForm, setShowForm] = useState(false);

  const apiDataContext = useContext(ApiDataContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const personalData = { vekt, høyde };

    if (apiDataContext?.postPersonalData) {
      apiDataContext.postPersonalData(personalData);

      toast.success("Personlige data er oppdattert!");
    } else {
      toast.error("Kunne ikke legge til treningsøkten.");
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vekt"
              type="number"
              value={vekt}
              onChange={(e) => setVekt(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="høyde"
            >
              Høyde:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="høyde"
              type="number"
              value={høyde}
              onChange={(e) => setHøyde(e.target.value)}
            />
          </div>
          {/* Input-felter for annen personlig data kan legges til her */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Lagre Data
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddPersonalData;
