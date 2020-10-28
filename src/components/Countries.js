import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Countries = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByRegion, setSearchByRegion] = useState("Filter by Region");
  const [url, setUrl] = useState("https://restcountries.eu/rest/v2/all");

  const dispatch = useDispatch();

  const changeByFilter = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeByRegion = (event) => {
    setSearchByRegion(event.target.value);
  };

  useEffect(() => {
    async function getCountriesData() {
      const result = await axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(function (response) {
          setCountriesData(response.data);
        });
    }
    getCountriesData();
  }, []);

  useEffect(() => {
    if (searchTerm === " " || searchTerm === "") {
      setUrl(`https://restcountries.eu/rest/v2/all`);
    } else {
      setUrl(`https://restcountries.eu/rest/v2/name/${searchTerm}`);
    }

    async function getFilteredData() {
      const result = await axios.get(url).then(function (response) {
        setCountriesData(response.data);
      });
    }
    getFilteredData();
  }, [searchTerm]);

  useEffect(() => {
    async function getFilteredRegion() {
      if (searchByRegion !== "Filter by Region") {
        const result = await axios
          .get(
            `https://restcountries.eu/rest/v2/region/${searchByRegion.toLowerCase()}`
          )
          .then(function (response) {
            setCountriesData(response.data);
          });
      } else {
        const result = await axios
          .get(`https://restcountries.eu/rest/v2/all`)
          .then(function (response) {
            setCountriesData(response.data);
          });
      }
    }
    getFilteredRegion();
  }, [searchByRegion]);

  return (
    <div>
      <Header />
      <div
        className="row"
        style={{ justifyContent: "center", paddingTop: "5%" }}
      >
        <form
          className="form-inline active-pink-3 active-pink-4"
          style={{ width: "100%" }}
        >
          <div className="col-sm-6" style={{ textAlign: "center" }}>
            <div className="inputUp">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input
                className="form-control form-control-sm ml-3 w-75"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={changeByFilter}
              />
            </div>
          </div>
          <div className="col-sm-6" style={{ textAlign: "center" }}>
            <select
              className="selectUp form-control"
              id="exampleFormControlSelect1"
              onChange={changeByRegion}
            >
              <option>Filter by Region</option>
              <option>Africa</option>
              <option>Americas</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>
        </form>
      </div>
      <div
        className="row"
        style={{ justifyContent: "center", paddingTop: "5%" }}
      >
        {countriesData.map((item) => (
          <Link
            key={item.numericCode}
            className="column"
            style={{ padding: "2%" }}
            to="/country"
            onClick={() =>
              dispatch({
                type: "SELECT_COUNTRY_NAME",
                countryName: item.name.toLowerCase(),
              })
            }
            value={item.name.toLowerCase()}
          >
            <div>
              <div className="card" style={{ width: "16rem" }}>
                <img
                  className="card-img-top"
                  src={item.flag}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    <b>Population:</b>
                    <span>{item.population}</span>
                  </p>
                  <p className="card-text">
                    <b>Region:</b>
                    <span>{item.region}</span>
                  </p>
                  <p className="card-text">
                    <b>Capital:</b>
                    <span>{item.capital}</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Countries;
