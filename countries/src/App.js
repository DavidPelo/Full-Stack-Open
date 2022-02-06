import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import CountryProfile from "./components/CountryProfile";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const getCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(getCountries, []);

  

  const searchHandler = (e) => {
    setSearchBy(e.target.value);
  };

  const showProfileHandler = (countryName) => {
    setSearchBy(countryName);
  };

  const countryList = countries
    .filter((country) => country.name.common.indexOf(searchBy) > -1)
    .map((country) => {
      return (
        <Country
          name={country.name.common}
          key={country.cca2}
          showProfileHandler={showProfileHandler}
        />
      );
    });

  const getCountryContent = () => {
    let list = [];
    if (searchBy) {
      if (countryList.length === 1) {
        const country = countries.find(
          (country) => country.name.common.indexOf(searchBy) > -1
        );
        list.push(<CountryProfile key={country.cca2} country={country} />);
      } else if (countryList.length <= 10) {
        list = countryList;
      } else {
        list = "Please provide a more specific search parameter";
      }
    } else {
      list = "Please search for a country";
    }

    return list;
  };

  return (
    <div>
      <div>
        <label htmlFor="search">find countries </label>
        <input type="text" name="search" id="search" onChange={searchHandler} />
      </div>
      <div>{getCountryContent()}</div>
    </div>
  );
}

export default App;
