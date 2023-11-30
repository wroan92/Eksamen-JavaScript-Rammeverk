import ExerciseRecords from "../ExerciseRecords.tsx";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Velkommen Til Home</h1>
      <h2>Top 5 Treningsøkter</h2>
      <ExerciseRecords />
    </div>
  );
};

export default Home;
