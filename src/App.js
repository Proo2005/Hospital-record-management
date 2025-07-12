import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing";
import DetailsPage from "./pages/Details";
import AppointmentPage from "./pages/appointment";
import AdminPage from "./pages/admin";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
