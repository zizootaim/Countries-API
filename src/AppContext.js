import React, { useContext, useState, useReducer, useEffect } from "react";
import * as Reducer from "./reducer";

const url = "https://restcountries.com/v2/all";
const initialState = {
  loading: false,
  data: [],
  error: "",
  theme: 'light'
};
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer.reducer, initialState);

  const formatBorders = (countries, country) => {
    const { borders } = country;
    const x = borders.map((b) => {
      if (b == "ISR") b = "PAL";
      let newB;
      countries.forEach((c) => {
        if (c.cioc && b == c.cioc) {
          newB = c.name;
        }
      });
      return newB;
    });
    return x;
  };

  const formatData = (data) => {
    const newData = data.map((c) => {
      const {
        name,
        topLevelDomain,
        capital,
        nativeName,
        subregion,
        region,
        population,
        flag,
        currencies,
        languages,
        borders,
        cioc,
      } = c;
      const newBorders = borders ? formatBorders(data, c) : undefined;

      return {
        name,
        topLevelDomain,
        capital,
        nativeName,
        subregion,
        region,
        population,
        flag,
        currencies,
        languages,
        borders: newBorders,
        cioc,
      };
    });
    return newData;
  };

  const fetchData = async () => {
    dispatch({ type: Reducer.FETCH_USERS_REQUEST });
    const res = await fetch(url);
    const data = await res.json();

    if (data) {
      const allData = data
        .filter((c) => c.capital != "Ramallah")
        .map((c) => {
          if (c.topLevelDomain == ".il") {
            return p();
          }
          return c;
        });

      dispatch({
        type: Reducer.FETCH_USERS_SUCCESS,
        payload: formatData(allData),
      });
    } else {
      const error = "Error, Please Try Again.";
      dispatch({ type: Reducer.FETCH_USERS_FAILURE, payload: error });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state,dispatch }}>{children}</AppContext.Provider>
  );
};

export const useContextGlobally = () => {
  return useContext(AppContext);
};

const p = () => {
  return {
    name: "Palestine",
    topLevelDomain: ".ps",
    capital: "Jerusalem",
    nativeName: "فلسطين",
    subregion: "Western Asia",
    region: "Asia",
    population: 4803000,
    flag: "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg",
    currencies: [{ name: "Palestinian Pound" }],
    languages: [{ name: "Arabic" }],
    borders: ["EGY", "JOR", "LBN", "SYR"],
    cioc: "PAL",
  };
};
/*

name, "Palestine"
topLevelDomain, ".ps"
capital,  "Jerusalem"
nativeName, "فلسطين"
subregion, "Western Asia"
region, "Asia"
population,"4.803M"
flag, 'https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg'
currencies, ['Palestine Pound']
languages, [{name:'Arabic'}]
borders: ['Egypt','Jordan','Syrian Arab Republic'],
cioc, null


*/
