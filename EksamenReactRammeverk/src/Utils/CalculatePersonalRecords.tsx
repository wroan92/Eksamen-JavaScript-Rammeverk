import { Exercise } from "../Types/TrainingSession.tsx";
/* import { MuscleGroups } from "../Types/MuscleGroups.tsx"; */
import { PersonalRecord } from "../Types/PersonalRecord.tsx";

export const calculatePersonalRecords = (
  sessions: Exercise[]
): PersonalRecord[] => {
  const records: Record<string, PersonalRecord> = {};

  sessions.forEach((session) => {
    const key = session.name;
    const currentRecord = records[key];

    if (!currentRecord || currentRecord.maxWeight < session.weight) {
      records[key] = {
        exercise: session.name,
        maxWeight: session.weight,
        maxReps: session.reps,
        maxSets: session.sets,
      };
    }
  });

  return Object.values(records);
};
