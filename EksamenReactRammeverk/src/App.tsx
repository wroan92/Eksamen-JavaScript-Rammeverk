import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApiDataProvider } from "../src/Context/ApiDataContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../src/Components/Pages/Home";
import UserPage from "../src/Components/Pages/UserPage.tsx";

import Menu from "../src/Components/Menu";

function App() {
  return (
    <Router>
      <ApiDataProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserPage" element={<UserPage />} />
        </Routes>
        <ToastContainer />
      </ApiDataProvider>
    </Router>
  );
}

export default App;
