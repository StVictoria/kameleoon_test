import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Result";
import Finalize from "./pages/Finalize";
import TestPageLayout from "./components/TestPageLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route element={<TestPageLayout />}>
        <Route path="results/:id" element={<Results />} />
        <Route path="finalize/:id" element={<Finalize />} />
      </Route>
    </Routes>
  );
}

export default App;
