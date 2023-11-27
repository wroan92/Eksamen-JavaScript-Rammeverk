import { useState, useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext.tsx";
import { TrainingSession } from "../Types/TrainingSession.tsx";

const AddTrainingComponent = () => {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [reps, setReps] = useState(1);
  const [sets, setSets] = useState(1);
  const [weight, setWeight] = useState(0);
  const apiDataContext = useContext(ApiDataContext);

  const handleMuscleGroupClick = (group: string) => {
    setMuscleGroup(group);
    setShowOptions(true);
  };

  const handleSubmit = () => {
    const newTrainingSession: TrainingSession = {
      muscleGroup,
      reps,
      sets,
      weight,
    };

    if (apiDataContext?.addTrainingSession) {
      apiDataContext.addTrainingSession(newTrainingSession);
    }
  };

  return (
    <div>
      <h3>Legg til Trening</h3>
      <div>
        <button onClick={() => handleMuscleGroupClick("biceps")}>Biceps</button>
        <button onClick={() => handleMuscleGroupClick("triceps")}>Triceps</button>
        <button onClick={() => handleMuscleGroupClick("glutusMaximus")}>
          Glutus Maximus
        </button>
      </div>
      {showOptions && (
        <div>
          <div>
            <label>Reps: </label>
            <select value={reps} onChange={(e) => setReps(Number(e.target.value))}>
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Sets: </label>
            <select value={sets} onChange={(e) => setSets(Number(e.target.value))}>
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Vekt (kg): </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          <button onClick={handleSubmit}>Legg Til</button>
        </div>
      )}
    </div>
  );
};

export default AddTrainingComponent;
