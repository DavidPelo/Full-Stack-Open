import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

function CountryProfile({ country }) {
  const [weather, setWeather] = useState([]);
  const [ready, setReady] = useState(false);

  const getCapitalWeather = () => {
    const capitalLatitude = country.capitalInfo.latlng[0];
    const capitalLongitude = country.capitalInfo.latlng[1];
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiEndpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${capitalLatitude}&lon=${capitalLongitude}&appid=${apiKey}`;

    axios.get(apiEndpoint).then((response) => {
      setWeather(response.data);
      setReady(true);
    });
  };
  useEffect(getCapitalWeather, []);

  const prepareLanguages = () => {
    let languageList = [];
    for (const language in country.languages) {
      languageList.push(country.languages[language]);
    }

    const languageItems = languageList.map((language) => (
      <li key={Math.random()}>{language}</li>
    ));

    return languageItems;
  };

  const name = country.name.common;
  const capital = country.capital[0];
  const population = country.population;
  const flag = country.flags.png;
  const languages = prepareLanguages();

  return (
    <>
      {ready ? (
        <div>
          <h1>{name}</h1>
          <p>capital {capital}</p>
          <p>population {population}</p>
          <h2>languages</h2>
          <ul>{languages}</ul>
          <img src={flag} alt="country flag" />
          <Weather capital={capital} data={weather} />
        </div>
      ) : <p>Loading Country information...</p>}
    </>
  );
}

export default CountryProfile;
