import React, { createContext, useState, useEffect } from "react";
import { TrainingSession } from "../Types/TrainingSession";
import { MuscleGroups } from "../Types/MuscleGroups";
import { PersonalRecord } from "../Types/PersonalRecord";
import { calculatePersonalRecords } from "../Utils/CalculatePersonalRecords";

interface ApiDataContextType {
  exerciseData: TrainingSession[] | null;
  muscleGroupsData: MuscleGroups[] | null;
  personalRecordsData: PersonalRecord[] | null;
  addTrainingSession: (session: TrainingSession) => void;
}

// Opprette konteksten
export const ApiDataContext = createContext<ApiDataContextType | null>(null);

// Komponent for å tilby konteksten til underkomponenter
export const ApiDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exerciseData, setExercises] = useState<TrainingSession[] | null>(null);
  const [muscleGroupsData, setMuscleGroupsData] = useState<
    MuscleGroups[] | null
  >(null);
  const [personalRecordsData, setPersonalRecords] = useState<
    PersonalRecord[] | null
  >(null);

  // Funksjon for å legge til en ny treningsøkt
  const addTrainingSession = (session: TrainingSession) => {
    fetch("https://crudcrud.com/api/846d92640caf4166a769a446c1e7d900/øvelser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ny treningsøkt lagt til:", data);
      // Her kan du vurdere å oppdatere exerciseData med den nye treningsøkten
    })
    .catch((error) => console.error("Error:", error));
  };

  // Hente data ved montering av komponenten
  useEffect(() => {
    Promise.all([
      fetch("https://crudcrud.com/api/846d92640caf4166a769a446c1e7d900/øvelser")
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
          return [];
        }),
      fetch(
        "https://crudcrud.com/api/846d92640caf4166a769a446c1e7d900/muskelgrupper"
      )
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
          return [];
        }),
    ]).then(([exercises, muscleGroups]) => {
      setExercises(exercises);
      setMuscleGroupsData(muscleGroups);
      setPersonalRecords(calculatePersonalRecords(exercises));
    });
  }, []);

  return (
    <ApiDataContext.Provider
      value={{
        exerciseData,
        muscleGroupsData,
        personalRecordsData,
        addTrainingSession,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
