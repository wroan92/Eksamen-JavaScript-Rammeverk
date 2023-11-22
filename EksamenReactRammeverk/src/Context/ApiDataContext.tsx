import { createContext, useState, useEffect, ReactNode } from "react";
import { TrainingExercise } from "../Types/TrainingExercise.tsx";
import { TrainingMuscleGroups } from "../Types/TrainingMuscleGroups.tsx";

interface ApiDataContextType {
    trainingExercise: TrainingExercise[] | null;
    trainingMuscleGroups: TrainingMuscleGroups[] | null;
    // Legg til flere data typer etter behov
}

export const ApiDataContext = createContext<ApiDataContextType | null>(null);

export const ApiDataProvider = ({ children }: { children: ReactNode }) => {
    const [trainingExercise, setTrainingExercise] = useState<TrainingExercise[] | null>(null);
    const [trainingMuscleGroups, setTrainingMuscleGroups] = useState<TrainingMuscleGroups[] | null>(null);
    // Flere tilstandsvariabler for forskjellige datatyper

    useEffect(() => {
        // Hent data for trainingSessions
        fetch('https://crudcrud.com/api/3be331c9361f4460aa92b8c0f39cd25a/øvelser')
            .then(response => response.json())
            .then(data => setTrainingExercise(data))
            .catch(error => console.error("Error:", error));

        // Hent data for anotherDataType
        fetch('https://crudcrud.com/api/3be331c9361f4460aa92b8c0f39cd25a/muskelgrupper')
            .then(response => response.json())
            .then(data => setTrainingMuscleGroups(data))
            .catch(error => console.error("Error:", error));

        // Gjenta for andre datatyper/endepunkter
    }, []);

    return (
        <ApiDataContext.Provider value={{ trainingExercise, trainingMuscleGroups }}>
            {children}
        </ApiDataContext.Provider>
    );
};

