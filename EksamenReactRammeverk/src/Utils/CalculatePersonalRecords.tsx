import { TrainingSession } from "../Types/TrainingSession";
import { PersonalRecords } from "../Types/PersonalRecords";

export const calculatePersonalRecords = (
  sessions: TrainingSession[]
): Record<string, PersonalRecords[]> => {
  const records: Record<string, PersonalRecords[]> = {};

  sessions.forEach((session) => {
    const key = session.navn;
    if (!records[key]) {
      records[key] = [];
    }

    const newRecord: PersonalRecords = {
      exercise: session.navn,
      maxWeight: session.vekt,
      maxReps: session.repetisjoner,
      maxSets: session.sett,
    };

    records[key].push(newRecord);

    records[key].sort((a, b) => {
      if (b.maxWeight !== a.maxWeight) return b.maxWeight - a.maxWeight;
      if (b.maxSets !== a.maxSets) return b.maxSets - a.maxSets;
      return b.maxReps - a.maxReps;
    });

    if (records[key].length > 5) {
      records[key].length = 5; 
    }
  });

  return records;
};
