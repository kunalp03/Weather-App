import { useState, useRef } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'

import './App.css';

const api = {
  key : process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
}
function App() {
  const first = useRef("");

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
    .then(res => res.json())
    .then(result => {
      if (result.message === "city not found") {
        window.alert("City not found");
      } else {
        setWeather(result);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const border = () => {
    first.current.style.border = "2px solid blue";
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Weather App</h1>
      <div className='search' ref={first}>
        <input
        className='search_here'
        type='text'
        placeholder='Enter City/town'
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => border()}
        />
        <AiOutlineSearch onClick={searchPressed} className='icon' />
      </div>

      <div>
        <img src='./icon.png' className='img_icon'/>
      </div>

      {typeof weather.main !== "undefined" ? (
          <div className='weather_info'>
            {/* Temperature Celsius  */}
            <p className='temp'>{weather.main.temp}°C</p>

            {/* Location  */}
            <p className='city'>{weather.name}</p>

            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
        
      </header>
    </div>
  );
}

export default App;
