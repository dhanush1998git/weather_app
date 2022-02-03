import React from "react";
import "./App.css";

function App() {
  const [value, setValue] = React.useState("");
  const [temp, setTemp] = React.useState();
  const [weather, setWeather] = React.useState();
  const [isSearchFail, setSearchFail] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState("");
  const [cityName, setCityName] = React.useState("");

  async function fnApiCall() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?appid=c8e384cde0a69d5b34f42100e805dada&q=${value}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemp(data && data.main && data.main.temp ? data.main.temp : "");
        setWeather(data && data.weather ? data.weather : []);
        setCityName(data && data.main && data.main.temp ? value : "");
        setSearchFail(
          (data && data.cod === "404") || (data && data.cod === "400")
            ? true
            : false
        );
        setErrorMsg(
          data && data.cod === "404"
            ? data.message
            : data.cod === "400"
            ? "Please enter city name"
            : ""
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <div className="App-body">
        <h2>Weather APP</h2>
        <div className="input-grp">
          <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="city name"
            className="input-box"
          />
          <button onClick={fnApiCall} className="search-button">
            search
          </button>
        </div>
        {!isSearchFail && <div className="city-name">{cityName}</div>}

        {!isSearchFail ? (
          temp ? (
            `${temp}°C`
          ) : (
            ""
          )
        ) : (
          <span style={{ fontSize: "26px", fontWeight: "900", margin: "20px" }}>
            {errorMsg}
          </span>
        )}

        {weather && weather.length > 0 && (
          <div className="weather">
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              Weather:
            </span>{" "}
            {weather ? weather[0].description : ""}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
