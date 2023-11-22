import { ApiDataProvider } from "../src/Context/ApiDataContext.tsx";
import Dashboard from "../src/Components/Dashboard.tsx";

function App() {
  return (
    <ApiDataProvider>
      <Dashboard />
    </ApiDataProvider>
  );
}

export default App;
