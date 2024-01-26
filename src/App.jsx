/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

// https://api.weatherapi.com/v1/current.json?Key=110d3f9df3b94c2bbb742912232811&q=delhi
/* Temp, Humidity, condition, Wind speed */

const Card = ({ name, value }) => {
  if (name == "Temperature") {
    value = `${value}°C`;
  } else if (name == "Humidity") {
    value = `${value}%`;
  } else if (name == "Conditon") {
    value = `${value}`;
  } else if (name == "Wind Speed") {
    value = `${value} kph`;
  }

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{value}</p>
    </div>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (text) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?Key=110d3f9df3b94c2bbb742912232811&q=${text}`
      );
      const resInJSON = await res.json();

      if (!resInJSON.hasOwnProperty("error")) {
        setData(resInJSON.current);
        console.log(resInJSON);
        setIsLoading(false);
      } else {
        alert("Failed to fetch weather data");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch weather data");
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    getData(search);
  };

  return (
    <div className="main__div">
      <div className="center__div">
        <div className="search__box">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search__btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="weather-cards">
          {/* {isLoading && <p>Loading data…</p>} */}

          {Object.keys(data).length !== 0 ? (
            <>
              <Card name="Temperature" value={data.temp_c} />
              <Card name="Humidity" value={data.humidity} />
              <Card name="Condition" value={data.condition.text} />
              <Card name="Wind Speed" value={data.wind_kph} />
            </>
          ) : (
            isLoading && <p>Loading data…</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
