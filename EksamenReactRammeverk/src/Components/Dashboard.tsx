import { useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { TrainingSession } from "../Types/TrainingSession";

const Dashboard: React.FC = () => {
  const context = useContext(ApiDataContext);

  if (!context || !context.exerciseData) {
    return <div>Loading...</div>;
  }

  const { exerciseData } = context;

  if (!exerciseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Training Sessions</h1>
      {exerciseData.length > 0 ? (
        <ul>
          {exerciseData.map((session: TrainingSession) => (
            <li key={session.id}>
              <strong>{session.name}</strong> -{session.sets} sets of{" "}
              {session.reps} reps at {session.weight}kg
            </li>
          ))}
        </ul>
      ) : (
        <p>No training sessions found.</p>
      )}
    </div>
  );
};

export default Dashboard;
