import React, { useState } from "react";
import { CHANGE_THEME } from "../reducer";
import { useContextGlobally } from "../AppContext";

const Home = () => {
  const {dispatch} = useContextGlobally()
  const toggleTheme = (e) => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      dispatch({type: CHANGE_THEME,payload: 'dark'})
      e.target.classList = "fa fa-sun-o";
    } else {
      dispatch({type: CHANGE_THEME,payload: 'light'})
      e.target.classList = "fa fa-moon-o";
    }
  };
 
  return (
    <header className="header">
      <nav className="nav">
        <h2 className="logo">Where in the world ?</h2>
        <div className="theme-toggler">
          <i className="fa fa-moon-o" onClick={toggleTheme}></i>
        </div>
      </nav>
      
    </header>
  );
};

export default Home;
