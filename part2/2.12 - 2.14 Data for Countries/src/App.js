import { React, useState, useEffect } from "react";
import axios from "axios";
import key from "./config";

const CountryDetails = ({ countriesToShow, search, handleSearchChange }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${countriesToShow[0].capital}&appid=${key}&units=metric`
      )
      .then((result) => {
        setWeather(result.data);
      })
      .catch((err) => console.log(err));
  }, [countriesToShow]);

  if (!weather) return <div>Loading....</div>;

  return (
    <>
      find countries: <input value={search} onChange={handleSearchChange} />
      <div>
        <h2>{countriesToShow[0].name}</h2>
        <div>capital: {countriesToShow[0].capital}</div>
        <div>population: {countriesToShow[0].population}</div>
        <h2>Languages</h2>
        {countriesToShow[0].languages.map((language) => (
          <div key={language.name}>{language.name}</div>
        ))}
        <img
          src={countriesToShow[0].flag}
          alt={"flag"}
          style={{ width: 200, height: 200 }}
        />
        <h2>Weather in {countriesToShow[0].capital}</h2>
        <div>
          <strong>temperature:</strong>
          {weather.main.temp} Celsius
        </div>
        <div>
          <strong>wind:</strong>
          <div>{weather.wind.speed} km/hr</div>
          <div>{weather.wind.deg} degrees</div>
        </div>
      </div>
    </>
  );
};

const Countries = ({ countries, search, showAll, handleSearchChange }) => {
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    if (showAll) {
      setCountriesToShow(countries);
    } else {
      setCountriesToShow(
        countries.filter(
          (country) =>
            country.name.toLowerCase().includes(search.toLowerCase()) === true
        )
      );
    }
  }, [countries, search, showAll]);

  function handleShownCountry(country) {
    setCountriesToShow([country]);
  }

  if (!countries) {
    return (
      <>
        find countries: <input value={search} onChange={handleSearchChange} />
        <div>No Countries</div>
      </>
    );
  }

  if (countriesToShow.length > 10) {
    return (
      <>
        find countries: <input value={search} onChange={handleSearchChange} />
        <div>Too many countries, try specifying another filter</div>
      </>
    );
  }

  if (countriesToShow.length === 1) {
    return (
      <CountryDetails {...{ countriesToShow, search, handleSearchChange }} />
    );
  }

  return (
    <>
      find countries: <input value={search} onChange={handleSearchChange} />
      {countriesToShow.map((country) => (
        <div key={country.name}>
          {country.name}
          <button onClick={() => handleShownCountry(country)}>show</button>
        </div>
      ))}
    </>
  );
};

function App() {
  const [showAll, setShowAll] = useState(true);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      setCountries(result.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    if (search === "") {
      setShowAll(true);
      setSearch(event.target.value);
    }
    setShowAll(false);
    setSearch(event.target.value);
  };
  return <Countries {...{ countries, search, showAll, handleSearchChange }} />;
}

export default App;
