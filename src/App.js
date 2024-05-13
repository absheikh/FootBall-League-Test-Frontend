import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Home from "./pages/landing/home/home";
import Teams from "./pages/landing/others/teams";
import Players from "./pages/landing/others/players";
import Fixtures from "./pages/landing/others/fixtures";
import Standings from "./pages/landing/others/standing";
import Results from "./pages/landing/others/results";
import Login from "./pages/Auth/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Register />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Dashboard />
    </Router>
  );
}

export default App;
