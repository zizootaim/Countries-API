import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Home from "./components/Home";
import Countries from "./components/Countries";
import SingleCountry from "./components/SingleCountry";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AppProvider>
      <Home />
      <Router>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:name" element={<SingleCountry />} />
        </Routes>
      </Router>
      <Footer />
    </AppProvider>
  );
};

export default App;
