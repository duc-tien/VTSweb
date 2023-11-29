import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Diagram from "./pages/Diagram/Diagram";
import Monitor from "./pages/Monitor/Monitor";
import Reports from "./pages/Reports/Reports";
import Monitor2 from "~/pages/Monitor2";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/diagram" element={<Diagram />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/monitor2" element={<Monitor2 />} />
      </Routes>
    </div>
  );
}

export default App;
