import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import backImg from "../images/back-arrow.svg";

const Country = () => {
  const countryName = useSelector((state) => state.countryName);
  const [country, setCountry] = useState(countryName);
  //const [borderList, setBorderList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getCountryData() {
      const result = await axios
        .get(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(function (response) {
          setData(response.data);
        });
    }

    getCountryData();
  }, [country]);

  const changeToBoard = (countryBoard) => {
    async function getCountryName() {
      const result = await axios
        .get(`https://restcountries.eu/rest/v2/alpha/${countryBoard}`)
        .then(function (response) {
          setCountry(response.data.name.toLowerCase());
        });
    }
    getCountryName();
  };
  return (
    <div>
      <Header />
      <div className="row" style={{ paddingBottom: "5%" }}>
        <div className="col-sm-6">
          <Link to="/" exact="true">
            <button type="button" className="btn btn-secondary">
              <img src={backImg} style={{ width: "25px", height: "25px" }} />
              <span>Back</span>
            </button>
          </Link>
        </div>
      </div>
      {data.map((item) => (
        <div key={item.alpha2Code} className="row">
          <div className="col-sm-6">
            <img src={item.flag} alt="..." className="img-thumbnail" />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-6">
                <p>
                  <span>
                    <b>Native Name:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>{item.nativeName}</span>
                </p>
                <p>
                  <span>
                    <b>Population:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>{item.population}</span>
                </p>
                <p>
                  <span>
                    <b>Region:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>{item.region}</span>
                </p>
                <p>
                  <span>
                    <b>Sub Region:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>{item.subregion}</span>
                </p>
                <p>
                  <span>
                    <b>Capital:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>{item.capital}</span>
                </p>
              </div>
              <div className="col-sm-6">
                <p>
                  <span>
                    <b>Topl Level Domain:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>
                    {item.topLevelDomain}
                  </span>
                </p>
                <p>
                  <span>
                    <b>Currencies:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>
                    {item.currencies.map((currencies, i) => {
                      if (item.currencies.length === i + 1) {
                        return currencies.name;
                      } else {
                        return currencies.name + ", ";
                      }
                    })}
                  </span>
                </p>
                <p>
                  <span>
                    <b>Languages:</b>
                  </span>
                  <span style={{ paddingLeft: "2%" }}>
                    {item.languages.map((languages, i) => {
                      if (item.languages.length === i + 1) {
                        return languages.name;
                      } else {
                        return languages.name + ", ";
                      }
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span>
                  <b>Border Countries:</b>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                {item.borders.map((border, i) => {
                  return (
                    <span key={i}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => changeToBoard(border)}
                        style={{ margin: "3%" }}
                      >
                        {border}
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Country;
