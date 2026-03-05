import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Report from "./Report";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}

export default App;