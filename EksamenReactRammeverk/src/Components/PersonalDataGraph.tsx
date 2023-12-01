import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ApiDataContext } from '../Context/ApiDataContext';
import { PersonalData } from '../Types/PersonalData'; // Antar at du har denne typedefinisjonen

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PersonalDataGraph = () => {
  const context = useContext(ApiDataContext);
  const personalData = context?.personalData; // Anta at dette er en array av PersonalData

  const data = {
    labels: personalData?.map((entry: PersonalData) => entry.dato), // Antar at du har en 'date'-property
    datasets: [
      {
        label: 'Vekt',
        data: personalData?.map((entry: PersonalData) => entry.vekt),
        borderColor: 'blue',
        borderWidth: 2,
      },
      {
        label: 'BMI',
        data: personalData?.map((entry: PersonalData) => entry.vekt / Math.pow(entry.høyde / 100, 2)),
        borderColor: 'red',
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PersonalDataGraph;
