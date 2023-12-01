import { TrainingSession } from "../Types/TrainingSession";

export const calculateExerciseData = (sessions: TrainingSession[]) => {
  const exercises: Record<string, { bestScore: number, weight: number, sets: number, reps: number }> = {};

  sessions.forEach((session) => {
    const key = session.navn;

    const currentScore = session.vekt / (session.sett * session.repetisjoner);

    if (!exercises[key] || exercises[key].bestScore < currentScore) {
      exercises[key] = {
        bestScore: currentScore,
        weight: session.vekt,
        sets: session.sett,
        reps: session.repetisjoner
      };
    }
  });

  const labels = Object.keys(exercises);
  const data = labels.map(label => exercises[label].weight); 
  const setRepsData = labels.map(label => `Sett: ${exercises[label].sets} Reps: ${exercises[label].reps}`);

  const chartData = {
    labels,
    datasets: [{
      label: 'Beste Score Vekt',
      data,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  return { chartData, setRepsData };
};

