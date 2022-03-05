import React, { useState, useEffect, useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import millify from "millify";
import regions from "../data";
import { useContextGlobally } from "../AppContext";
import { useNavigate } from "react-router-dom";

const Countries = () => {
  const navigate = useNavigate();
  const { state } = useContextGlobally();
  const iconRef = useRef();
  const [filteredData, setFilteredData] = useState(state.data);
  const [searchValue, setSearchValue] = useState("");
  const [region, setRegion] = useState("all");

  const showMenu = (open) => {
    let height = 0;
    let iconDir = "down";
    if (open) {
      iconDir = "up";
      Array.from(document.querySelector(".form__list").children).forEach(
        (li) => {
          const liHeight = li.getBoundingClientRect().height;
          height += liHeight;
        }
      );
    }
    iconRef.current.className = `fa fa-angle-${iconDir}`;
    document.querySelector(".form__list").style.height = height + "px";
  };

  useEffect(() => {
    if (!state.loading) setFilteredData(state.data);
  }, [state.loading]);

  useEffect(() => {
    const newFilteredData = state.data
      .filter((c) => {
        if (region == "all") return c;
        else {
          return c.region.toLowerCase() == region.toLowerCase();
        }
      })
      .filter((c) =>
        c.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );

    if (newFilteredData.length >= 1) setFilteredData(newFilteredData);
  }, [searchValue, region]);

  if (state.loading) {
    return (
      <div className="sketlon">
        <SkeletonTheme
          baseColor={state.theme == "light" ? "#eee" : "#2b3945"}
          highlightColor={state.theme == "light" ? "#fff" : "#202c37"}
        >
          <p>
            <Skeleton count={2} height={50} />
          </p>
          <p>
            <Skeleton count={4} height={50} />
          </p>
          <p>
            <Skeleton count={4} height={50} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }

  return state.data ? (
    <section className="countries__wrapper">
      <article className="countries__form">
        <div className="form__control">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="form__list-wrapper">
          <span>Filter by Region</span>
          <div className="form__list-header" onClick={() => showMenu(true)}>
            <span>{region}</span>
            <i ref={iconRef} className="fa fa-angle-down"></i>
          </div>
          <ul className="form__list">
            {regions.map((r, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setRegion(r.name);
                    showMenu(false);
                  }}
                >
                  {r.name}
                </li>
              );
            })}
          </ul>
        </div>
      </article>
      <article className="countries">
        {filteredData.map((c, index) => {
          if (c != null) {
            return (
              <div
                className="country"
                key={index}
                onClick={() => navigate(c.name)}
              >
                <div className="flag">
                  <img src={c.flag} alt="flag" />
                </div>
                <div className="country__data">
                  <h3>{c.name}</h3>
                  <h5>
                    Population : <span>{millify(c.population)}</span>
                  </h5>
                  <h5>
                    Region : <span>{c.region}</span>
                  </h5>
                  <h5>
                    Capital : <span>{c.capital}</span>
                  </h5>
                </div>
              </div>
            );
          } else {
            return "No Country";
          }
        })}
      </article>
    </section>
  ) : (
    <h1>{state.error}</h1>
  );
};

export default Countries;
