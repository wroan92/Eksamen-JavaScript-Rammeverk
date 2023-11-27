import React, { useContext } from 'react';
import { ApiDataContext } from '../Context/ApiDataContext.tsx';
import { calculatePersonalRecords } from '../Utils/CalculatePersonalRecords.tsx';

const ExerciseRecords: React.FC = () => {
    const context = useContext(ApiDataContext);

    if (!context || !context.exerciseData) {
        return <div>Loading...</div>;
    }

    const maxRecords = calculatePersonalRecords(context.exerciseData);

    return (
        <div>
            <h1>Exercise Records</h1>
            <ul>
                {maxRecords.map(record => (
                    <li key={record.exercise}>
                        {record.exercise}: Max Reps: {record.maxReps}, Max Sets: {record.maxSets}, Max Weight: {record.maxWeight}kg
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseRecords;
