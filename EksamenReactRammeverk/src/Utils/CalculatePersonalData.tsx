import { PersonalData } from "../Types/PersonalData";

export const calculateWeightAndBMI = (personalData: PersonalData[]) => {
  const labels = personalData.map((data) => Number(data.dato));
  const weightData = personalData.map((data) => Number(data.vekt));
  const bmiData = personalData.map(
    (data) => Number(data.vekt) / Math.pow(Number(data.høyde) / 100, 2)
  );

  return {
    labels,
    weightData,
    bmiData,
  };
};
