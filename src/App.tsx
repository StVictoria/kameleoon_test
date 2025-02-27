import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Result";
import Finalize from "./pages/Finalize";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="results" element={<Results />} />
      <Route path="finalize" element={<Finalize />} />
    </Routes>
  );
}

export default App;
