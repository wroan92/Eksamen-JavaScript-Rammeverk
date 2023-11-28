import { useState, useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { TrainingSession } from "../Types/TrainingSession";

const AddTrainingComponent: React.FC = () => {
  const [navn, setNavn] = useState<string>("");
  const [muskelgruppe, setMuskelGruppe] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [repetisjoner, setReps] = useState<number>(1);
  const [sett, setSets] = useState<number>(1);
  const [vekt, setWeight] = useState<number>(0);
  const apiDataContext = useContext(ApiDataContext);

  const exercisesMapping: Record<string, string> = {
    benkpress: "Bryst",
    beinpress: "Bein",
    markløft: "Rygg",
    nedtrekk: "Rygg",
  };

  const handleExerciseClick = (exercise: string) => {
    setNavn(exercise);
    setMuskelGruppe(exercisesMapping[exercise]);
    setShowOptions(true);
  };

  const handleSubmit = () => {
    const newTrainingSession: TrainingSession = {
      navn,
      muskelgruppe,
      vekt,
      repetisjoner,
      sett,
    };

    if (apiDataContext?.addTrainingSession) {
      apiDataContext.addTrainingSession(newTrainingSession);
      // Reset form fields after submission
      setNavn("");
      setMuskelGruppe("");
      setReps(1);
      setSets(1);
      setWeight(0);
      setShowOptions(false);
    }
  };

  return (
    <div>
      <h3>Legg til Trening</h3>
      <div>
        {Object.keys(exercisesMapping).map((exercise) => (
          <button key={exercise} onClick={() => handleExerciseClick(exercise)}>
            {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
          </button>
        ))}
      </div>
      {showOptions && (
        <div>
          <p>Valgt øvelse: {navn.charAt(0).toUpperCase() + navn.slice(1)}</p>
          <p>Muskelgruppe: {muskelgruppe}</p>
          <div>
            <label>Repetisjoner: </label>
            <select value={repetisjoner} onChange={(e) => setReps(Number(e.target.value))}>
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Sett: </label>
            <select value={sett} onChange={(e) => setSets(Number(e.target.value))}>
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Vekt (kg): </label>
            <input type="number" value={vekt} onChange={(e) => setWeight(Number(e.target.value))} />
          </div>
          <button onClick={handleSubmit}>Legg Til</button>
        </div>
      )}
    </div>
  );
};

export default AddTrainingComponent;


