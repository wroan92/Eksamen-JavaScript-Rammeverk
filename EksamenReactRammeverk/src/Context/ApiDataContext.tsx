import { createContext, useState, useEffect } from "react";
import { TrainingSession } from "../Types/TrainingSession";

interface ApiDataContextType {
  exerciseData: TrainingSession[] | null;
  addTrainingSession: (session: TrainingSession) => void;
}

export const ApiDataContext = createContext<ApiDataContextType | null>(null);

export const ApiDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exerciseData, setExercises] = useState<TrainingSession[] | null>(null);

  const addTrainingSession = (session: TrainingSession) => {
    fetch("https://crudcrud.com/api/72727771933f463c84a2e6de0fe6ce22/øvelser", {
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
        setExercises((prevExercises) => [...(prevExercises || []), data]);
      })
      .catch((error) => {
        console.error("Feil ved posting av treningsøkt:", error);
      });
  };

  useEffect(() => {
    fetch("https://crudcrud.com/api/72727771933f463c84a2e6de0fe6ce22/øvelser")
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <ApiDataContext.Provider value={{ exerciseData, addTrainingSession }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataProvider;

