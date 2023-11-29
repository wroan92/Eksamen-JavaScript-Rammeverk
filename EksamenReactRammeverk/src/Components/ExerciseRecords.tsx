import React, { useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { calculatePersonalRecords } from "../Utils/CalculatePersonalRecords";
import { PersonalRecords } from "../Types/PersonalRecords";

const ExerciseRecords: React.FC = () => {
  const context = useContext(ApiDataContext);

  if (!context || !context.exerciseData) {
    return <div>Loading...</div>;
  }

  const recordsObj = calculatePersonalRecords(context.exerciseData);
  const maxRecords = Object.values(recordsObj).flat();

  return (
    <div>
      <h1>Exercise Records</h1>
      <ul>
        {maxRecords.map((record: PersonalRecords, index: number) => (
          <li key={`${record.exercise}-${index}`}>
            {record.exercise}: Max Reps: {record.maxReps}, Max Sets: {record.maxSets}, Max Weight: {record.maxWeight}kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseRecords;

