import { createContext, useState, useEffect } from "react";
import { TrainingSession } from "../Types/TrainingSession";
import { PersonalData } from "../Types/PersonalData";


interface ApiDataContextType {
  exerciseData: TrainingSession[] | null;
  personalData: PersonalData[] | null; // Lagt til et felt for personlig data
  addTrainingSession: (session: TrainingSession) => Promise<boolean>;
  postPersonalData: (personalData: PersonalData) => Promise<boolean>;
}

const API_KEY = import.meta.env.VITE_API_KEY;

export const ApiDataContext = createContext<ApiDataContextType | null>(null);

export const ApiDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exerciseData, setExercises] = useState<TrainingSession[] | null>(null);
  const [personalData, setPersonalData] = useState<PersonalData[] | null>(null); // Ny state for personlig data

  const addTrainingSession = async (session: TrainingSession): Promise<boolean> => {
    try {
      const response = await fetch(`${API_KEY}/ovelser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setExercises((prevExercises) => prevExercises ? [...prevExercises, data] : [data]);
      return true;
    } catch (error) {
      console.error("Feil ved posting av treningsøkt:", error);
      return false;
    }
  };

  const postPersonalData = async (data: PersonalData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_KEY}/personalData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setPersonalData((prevData) => prevData ? [...prevData, result] : [result]);
      return true;
    } catch (error) {
      console.error("Feil ved posting av personlige data:", error);
      return false;
    }
  };

  useEffect(() => {
    // Hent treningsdata
    const fetchTrainingData = async () => {
      try {
        const response = await fetch(`${API_KEY}/ovelser`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Feil ved innhenting av treningsdata:", error);
      }
    };

    // Hent personlig data
    const fetchPersonalData = async () => {
      try {
        const response = await fetch(`${API_KEY}/personalData`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setPersonalData(data);
      } catch (error) {
        console.error("Feil ved innhenting av personlige data:", error);
      }
    };

    fetchTrainingData();
    fetchPersonalData();
  }, []);

  return (
    <ApiDataContext.Provider value={{ exerciseData, personalData, addTrainingSession, postPersonalData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataProvider;

