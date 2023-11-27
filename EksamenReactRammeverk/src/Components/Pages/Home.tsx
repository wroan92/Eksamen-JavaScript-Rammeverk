import React, { useContext } from "react";
import { ApiDataContext } from "../../Context/ApiDataContext.tsx";
/* import { PersonalRecord } from "../../Types/PersonalRecord.tsx"; */

const Home: React.FC = () => {
  const context = useContext(ApiDataContext);

  if (!context || !context.personalRecordsData) {
    return <div>Loading...</div>;
  }

  const { personalRecordsData } = context;

  return (
    <div>
      <h1>Welkommen Til Home</h1>
      <h2>Personlige Rekorder</h2>
      <ul>
        {personalRecordsData.map((record) => (
          <li key={record.exercise}>
            {record.exercise}: {record.maxWeight} kg for {record.maxReps} reps
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
