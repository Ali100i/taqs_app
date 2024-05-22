import './App.css';
import axios from 'axios';
import React, {useState} from 'react';


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a5cc5f8accd648becc18a1f580168106`

  const searchLocation = (e) => {
    if(e.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      setLocation('')

    }
  }

  return (
    <div className="App">
      <header className="container">
        <h1>Welcome to TAQS</h1>
        <input 
        value={location}
        className='search-field' 
        type='text' 
        placeholder='Enter location name'
        onChange={e => setLocation(e.target.value)}
        onKeyUp={searchLocation}
        />
        <div className='weather-card'>
          {data.name != undefined &&
        <div className="top">
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className='temp'>
            {data.main ? <p>{data.main.temp}°C</p> : null}
            </div>
            <div className="description">
            {data.weather[0] ? <p>{data.weather[0].description}</p> : null}
            </div>
        </div>
        } 

        {data.name != undefined &&
        <div className='bottom'>
          <div className='feels'>
          {data.main ? <p>feels like: {data.main.feels_like.toFixed()}°C</p> : null}
          </div>
          <div className='humidity'>
          {data.main ? <p>humidity: {data.main.humidity}%</p> : null}
          </div>
          <div className='wind'>
            {data.wind ? <p>wind speed: {data.wind.speed} km/h</p> : null}
          </div>
        </div>
        }
        </div>
      </header>
    </div>
        
  );
}

export default App;
