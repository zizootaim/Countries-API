import React, { useEffect, useState } from "react";
import millify from "millify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useContextGlobally } from "../AppContext";

const SingleCountry = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContextGlobally();
  const [country, setCountry] = useState("");
  const { name } = useParams();

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(loadingTime);
    };
  }, [isLoading]);

  useEffect(() => {
    const c = state.data.filter((s) => s.name == name);
    setCountry(c[0]);
  }, [country]);

  if (isLoading) {
    return (
      <div className="sketlon">
        <SkeletonTheme
          baseColor={state.theme == "light" ? "#eee" : "#2b3945"}
          highlightColor={state.theme == "light" ? "#fff" : "#202c37"}
        >
          <p>
            <Skeleton count={10} height={50} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
  return (
    <section className="single__country-wrapper">
      <button className="btn" onClick={() => navigate("/")}>
        <i className="fa fa-arrow-left"></i> back
      </button>
      {country.name ? (
        <article className="single__country">
          <div className="single__flag">
            <img src={country.flag} alt="flag" />
          </div>
          <div className="single__data">
            <h2>{country.name}</h2>
            <ul className="data__list">
              <li>
                <h5>
                  native name : <span>{country.nativeName}</span>
                </h5>
              </li>
              <li>
                <h5>
                  population : <span>{millify(country.population)}</span>
                </h5>
              </li>
              <li>
                <h5>
                  region : <span>{country.region}</span>
                </h5>
              </li>
              <li>
                <h5>
                  sub region : <span>{country.subregion}</span>
                </h5>
              </li>
              {country.capital ? (
                <li>
                  <h5>
                    capital : <span>{country.capital}</span>
                  </h5>
                </li>
              ) : (
                ""
              )}
              <li>
                <h5>
                  top level domain : <span>{country.topLevelDomain}</span>
                </h5>
              </li>
              {country.currencies ? (
                <li>
                  <h5>
                    currencies :
                    {country.currencies.map((c, index) => (
                      <span key={index}> {c.name} </span>
                    ))}
                  </h5>
                </li>
              ) : (
                ""
              )}
              <li>
                <h5>
                  languages :
                  {country.languages.map((l, index) => (
                    <span key={index}>
                      {" "}
                      {l.name}
                      {country.languages.length > 1 ? "," : ""}{" "}
                    </span>
                  ))}
                </h5>
              </li>
            </ul>
            {(country.borders && country.borders[0] !== undefined ) ? (
              <div className="bottom__data">
                <h5>border countries : </h5>
                <div>
                  {country.borders.map((b, index) => {
                    
                    if (b) {
                      return (
                        <button
                          className="btn"
                          key={index}
                          onClick={() => {
                            setIsLoading(true);
                            setCountry(b);
                            navigate(`/${b}`);
                          }}
                        >
                          {b.length > 10 ? `${b.slice(0, 6)}...` : b}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </article>
      ) : (
        ""
      )}
    </section>
  );
};

export default SingleCountry;
