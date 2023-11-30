import AddTrainingComponent from "../AddTraining.tsx";
import AddPersonalData from "../AddPersonalData.tsx";

const Dashboard = () => {
  return (
    <div className=" bg-gray-100 flex flex-row items-center justify-center mt-10 max-w-md mx-auto shadow-md rounded">
      <div className="p-4" > 
        <AddTrainingComponent />
      </div>
      <div>
        <AddPersonalData />
      </div>
    </div>
  );
};

export default Dashboard;
