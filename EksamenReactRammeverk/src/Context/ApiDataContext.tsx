import { createContext, useState, useEffect } from "react";
import { TrainingSession } from "../Types/TrainingSession";
/* import { PersonalData } from "../Types/PersonalData.tsx"; */
const API_KEY = import.meta.env.VITE_API_KEY;

interface ApiDataContextType {
  exerciseData: TrainingSession[] | null;
  addTrainingSession: (session: TrainingSession) => void;
  postPersonalData: (personalData: PersonalData) => void;
}

interface PersonalData {
  vekt: string;
  høyde: string;
}

export const ApiDataContext = createContext<ApiDataContextType | null>(null);

export const ApiDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exerciseData, setExercises] = useState<TrainingSession[] | null>(null);

  const addTrainingSession = (session: TrainingSession) => {
    fetch(`${API_KEY}/ovelser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        navn: session.navn,
        muskelgruppe: session.muskelgruppe,
        vekt: session.vekt,
        repetisjoner: session.repetisjoner,
        sett: session.sett,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ny treningsøkt lagt til:", data);
        setExercises((prevExercises) =>
          prevExercises ? [...prevExercises, data] : [data]
        );
      })
      .catch((error) => {
        console.error("Feil ved posting av treningsøkt:", error);
      });
  };

  const postPersonalData = (personalData: PersonalData) => {
    fetch(`${API_KEY}/personalData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personalData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Personlige data lagt til:", data);
        // Her kan du implementere oppdatering av state hvis nødvendig
      })
      .catch((error) => {
        console.error("Feil ved posting av personlige data:", error);
      });
  };

  useEffect(() => {
    fetch(`${API_KEY}/ovelser`)
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <ApiDataContext.Provider value={{ exerciseData, addTrainingSession, postPersonalData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataProvider;
