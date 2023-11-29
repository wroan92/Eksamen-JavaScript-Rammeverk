import React, { useContext } from "react";
import { ApiDataContext } from "../../Context/ApiDataContext";
import { calculatePersonalRecords } from "../../Utils/CalculatePersonalRecords";
import { PersonalRecords } from "../../Types/PersonalRecords";

const Home: React.FC = () => {
  const context = useContext(ApiDataContext);

  if (!context || !context.exerciseData) {
    return <div>Loading...</div>;
  }

  const recordsObj = calculatePersonalRecords(context.exerciseData);
  const topRecords = Object.values(recordsObj).flat().slice(0, 5); // Tar bare topp 5

  return (
    <div>
      <h1>Velkommen Til Home</h1>
      <h2>Top 5 Personlige Rekorder</h2>
      <ul>
        {topRecords.map((record: PersonalRecords, index: number) => (
          <li key={`${record.exercise}-${index}`}>
            {record.exercise}: {record.maxWeight} kg for {record.maxReps} reps
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

