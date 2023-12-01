import { useContext } from "react";
import ExerciseGraph from "../ExerciseGraph";
import PersonalDataGraph from "../PersonalDataGraph";
import { ApiDataContext } from "../../Context/ApiDataContext";

const Home: React.FC = () => {
  const apiDataContext = useContext(ApiDataContext);

  return (
<div className="flex flex-wrap mt-10">
  {apiDataContext &&
  apiDataContext.exerciseData &&
  apiDataContext.exerciseData.length > 0 ? (
    <>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
        <ExerciseGraph sessions={apiDataContext.exerciseData} />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
        {apiDataContext.personalData ? (
          <PersonalDataGraph />
        ) : (
          <p>Ingen personlige data tilgjengelig...</p>
        )}
      </div>
    </>
  ) : (
    <p className="p-4">Ingen treningsdata funnet...</p>
  )}
</div>
  );
};

export default Home;

