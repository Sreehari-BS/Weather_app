import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [info, setInfo] = useState({
    celcius: 10,
    name: "Attingal",
    humidity: 20,
    speed: 3,
    description: "nothing",
    main: "",
  });

  const [name, setName] = useState("Attingal");
  const [error, setError] = useState("");

  const handleApi = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=77681d67f6653a54ff58ab7ba642d833&units=metric`;
      const { data } = await axios.get(apiUrl);
      if (data) {
        setInfo({
          celcius: data.main.temp,
          name: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
          description: data.weather[0].description,
          main: data.weather[0].main,
        });
        setError("");
      }
    } catch (error) {
      if (error.response.data.cod === "404") {
        setError(error.response.data.message);
      } else {
        setError("");
      }
    }
  };

  const handleSearch = () => {
    if (name !== "") {
      handleApi();
      setName("");
    }
  };

  useEffect(() => {
    handleApi();
  }, []);
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="h-auto w-3/5 bg-orange-400 rounded-xl shadow-2xl flex flex-col justify-between">
        <div className="flex flex-row justify-between m-6">
          <input
            className="w-5/6 h-12 rounded-lg p-7"
            type="text"
            placeholder="Enter city name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-red-500 w-32 rounded-lg text-white font-extrabold hover:bg-red-700"
          >
            Search
          </button>
        </div>

        {error !== "" && (
          <div className="text-center font-bold text-red-600 bg-white mx-7 rounded-lg mb-3">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center mb-11">
          {info.main === "Clouds" ? (
            <img
              className="w-56 mb-7"
              src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
              alt="weather"
            />
          ) : info.main === "Clear" ? (
            <img
              className="w-56 mb-7"
              src="https://static-00.iconduck.com/assets.00/weather-clear-symbolic-icon-2048x2048-v4afvu7m.png"
              alt="weather"
            />
          ) : info.main === "Rain" ? (
            <img
              className="w-56 mb-3"
              src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
              alt="weather"
            />
          ) : info.main === "Drizzle" ? (
            <img
              className="w-56 mb-3"
              src="https://cdn-icons-png.flaticon.com/512/1458/1458966.png"
              alt="weather"
            />
          ) : info.main === "Mist" ? (
            <img
              className="w-56 mb-3"
              src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-daytime-foggy-weather-clouds-illustration-picture-image_8201381.png"
              alt="weather"
            />
          ) : (
            <img
              className="w-56 mb-3"
              src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
              alt="weather"
            />
          )}

          <h1 className="text-5xl font-extrabold text-white mb-3 font-mono">
            {info.celcius}°C
          </h1>
          <h2 className="text-2xl text-white font-semibold font-mono tracking-widest mb-3">
            {info.name}
          </h2>
          <h2 className="text-xl text-white font-mono tracking-tight">
            {info.description}
          </h2>
        </div>
        <div className="flex flex-row justify-between mb-5">
          <div className="flex flex-row justify-between w-24 ml-9">
            <img
              src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
              alt="humidity"
            />
            <div className="ml-3 flex flex-col justify-center">
              <p className="text-2xl font-semibold text-white">
                {info.humidity}%
              </p>
              <p className="text-2xl font-semibold text-white">Humidity</p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-24 mr-36">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3731/3731279.png"
              alt="wind"
            />
            <div className="ml-3 flex flex-col justify-center">
              <p className="text-2xl font-semibold text-white">
                {info.speed}km/h
              </p>
              <p className="text-2xl font-semibold text-white">Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
