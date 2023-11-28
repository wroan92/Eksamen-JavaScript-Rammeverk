import React, { useContext } from "react";
import { ApiDataContext } from "../../Context/ApiDataContext";
import { PersonalRecord } from "../../Types/PersonalRecord";

const Home: React.FC = () => {
  const context = useContext(ApiDataContext);

  if (!context || !context.personalRecordsData) {
    return <div>Loading...</div>;
  }

  const { personalRecordsData } = context;

  return (
    <div>
      <h1>Velkommen Til Home</h1>
      <h2>Personlige Rekorder</h2>
      <ul>
        {personalRecordsData.map((record: PersonalRecord, index: number) => (
          <li key={`${record.exercise}-${record.maxWeight}-${record.maxReps}-${index}`}>
            {record.exercise}: {record.maxWeight} kg for {record.maxReps} reps
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
