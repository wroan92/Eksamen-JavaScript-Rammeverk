import { useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { TrainingExercise } from "../Types/TrainingExercise";

const Dashboard: React.FC = () => {
  const context = useContext(ApiDataContext);

  if (!context || !context.trainingExercise) {
    return <div>Loading...</div>;
  }

  const { trainingExercise } = context;

  if (!trainingExercise) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Training Sessions</h1>
      {trainingExercise.length > 0 ? (
        <ul>
          {trainingExercise.map((session: TrainingExercise) => (
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
