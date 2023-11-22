import { useContext } from 'react';
import { ApiDataContext } from '../Context/ApiDataContext';

const ComponentA = () => {
    const context = useContext(ApiDataContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { data } = context;

    return (
        <div>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
        </div>
    );
};

export default ComponentA;
