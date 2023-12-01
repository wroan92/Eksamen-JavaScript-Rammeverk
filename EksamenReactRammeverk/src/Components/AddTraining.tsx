import { useState, useContext } from "react";
import { ApiDataContext } from "../Context/ApiDataContext";
import { TrainingSession } from "../Types/TrainingSession";
import { toast } from "react-toastify";

const AddTrainingComponent: React.FC = () => {
  const [navn, setNavn] = useState<string>("");
  const [muskelgruppe, setMuskelGruppe] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [repetisjoner, setReps] = useState<number>(1);
  const [sett, setSets] = useState<number>(1);
  const [vekt, setWeight] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const apiDataContext = useContext(ApiDataContext);

  const exercisesMapping: Record<string, string> = {
    Benkpress: "Bryst",
    Knebøy: "Bein",
    Markløft: "Rygg",
    BicepsCurl: "Biceps",
    TricepsPushdown: "Triceps",
    Skulderpress: "Skuldre",
    LatPulldown: "Øvre rygg",
    LegPress: "Bein",
    SitUps: "Mage",
    SideLateralRaise: "Skuldre",
    Lunges: "Bein",
    PullUps: "Rygg",
    ChinUps: "Rygg",
    LegCurls: "Hamstrings",
    Plank: "Kjerne",
    FacePulls: "Øvre rygg",
  };

  const handleExerciseClick = (exercise: string) => {
    setNavn(exercise);
    setMuskelGruppe(exercisesMapping[exercise]);
    setShowOptions(true);
  };

  const handleSubmit = async () => {
    const newTrainingSession: TrainingSession = {
      navn,
      muskelgruppe,
      vekt,
      repetisjoner,
      sett,
    };

    if (apiDataContext?.addTrainingSession) {
      try {
        const success = await apiDataContext.addTrainingSession(
          newTrainingSession
        );

        if (success) {
          toast.success("Ny treningsøkt lagt til!");
          setNavn("");
          setMuskelGruppe("");
          setReps(1);
          setSets(1);
          setWeight(0);
          setShowOptions(false);
        } else {
          toast.error(
            "Kunne ikke legge til treningsøkten. Kontakt administrator eller prøv igjen senere."
          );
        }
      } catch (error) {
        console.error("Feil ved posting av treningsøkt:", error);
        toast.error("En feil oppstod under lagring av treningsøkten.");
      }
    } else {
      toast.error("API-kontekst ikke tilgjengelig.");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setShowOptions(false);
    }
  };

  return (
    <div>
      <button
        onClick={toggleForm}
        className={`${
          showForm
            ? "bg-red-500 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded mb-4`}
      >
        {showForm ? "Lukk Skjema" : "Legg Til Ny Trening"}
      </button>

      {showForm && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(exercisesMapping).map((exercise) => (
              <button
                key={exercise}
                onClick={() => handleExerciseClick(exercise)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
              </button>
            ))}
          </div>
          {showOptions && (
            <div className="bg-gray-100 p-4 rounded">
              <p className="mb-2">
                Valgt øvelse:{" "}
                <strong>{navn.charAt(0).toUpperCase() + navn.slice(1)}</strong>
              </p>
              <p className="mb-4">
                Muskelgruppe: <strong>{muskelgruppe}</strong>
              </p>
              {/* Select to add reps */}
              <div className="mb-3">
                <label className="block mb-1">Repetisjoner: </label>
                <select
                  className="p-2 border rounded"
                  value={repetisjoner}
                  onChange={(e) => setReps(Number(e.target.value))}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              {/*Select to add sets*/}
              <div className="mb-3">
                <label className="block mb-1">Sett: </label>
                <select
                  className="p-2 border rounded"
                  value={sett}
                  onChange={(e) => setSets(Number(e.target.value))}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              {/*Select to add weight*/}
              <div className="mb-4">
                <label className="block mb-1">Vekt (kg): </label>
                <select
                  className="p-2 border rounded w-full"
                  value={vekt}
                  onChange={(e) => setWeight(Number(e.target.value))}
                >
                  {[...Array(500).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Legg Til
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddTrainingComponent;
