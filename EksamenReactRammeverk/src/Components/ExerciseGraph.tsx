import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { TrainingSession } from "../Types/TrainingSession";
import { calculateExerciseData } from "../Utils/CalculateExerciseData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  sessions: TrainingSession[];
}

const ExerciseGraph: React.FC<Props> = ({ sessions }) => {
  const { chartData, setRepsData } = calculateExerciseData(sessions);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Exercise Records",
        font: {
          size: 18,
        },
      },
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.formattedValue} kg (${setRepsData[tooltipItem.dataIndex]})`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ExerciseGraph;
