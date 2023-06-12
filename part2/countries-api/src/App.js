import { useEffect, useState } from "react";
import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?"

function App() {
  const [country, setCountry] = useState('');
  const [error, setError]     = useState('');
  const [info, setInfo]       = useState({
    name      : '',
    capital   : '',
    area      : '',
    languages : {},
    flag : {},
    latlng : null,
  });
  const [weather, setWeather] = useState({
    temp : '',
    wind : ''
  });

  useEffect(()=>{
      console.log("UseEffect is running");
      if(country){
        const url = `${baseUrl}/name/${country}`;
        axios.get(url)
             .then(response => {
                console.log(response);
                setError('');
                setInfo({
                  name    : response.data.name.common,
                  capital : response.data.capital[0],
                  area    : response.data.area,
                  languages: response.data.languages,
                  flag     : response.data.flags,
                  latlng   : response.data.latlng,
                });
              })
             .catch(error => {
                console.log(error);
                setError('Too many matches, specify another filter');
                setInfo({})
             });
      }
  }, [country]);

  if(info.latlng){
      const lat = info.latlng[0];
      const lon = info.latlng[1];
      const API_KEY = process.env.REACT_APP_API_KEY;
      const weather_url = `${weatherBaseUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      axios.get(weather_url)
            .then(response=> {
              console.log("Weather", response)
              let temperature = response.data.main.temp;
              let wind        = response.data.wind.speed;
              setWeather({
                temp : temperature,
                wind : wind
              })
            })
            .catch(error => console.log("error", error))
  }

  const searchCountry = (e) => {
    setCountry(e.target.value);
  }

  return (
    <div className="container">
        <div>
          <label htmlFor="countries">Find Countries </label>
          <input type="text" id="countries" value={country}  onChange={searchCountry}/>
        </div>
          {error && <label className="error">{error}</label>}
        {
          info.name && 
          <div className="country-info">
              <h4>{info.name}</h4>
              <h5>capital :  {info.capital}</h5>
              <h6>area    :  {info.area}</h6>


              <strong><span>languages</span></strong>
              {
                Object.keys(info.languages).map((k,i)=>{
                  return <li key={i}>{info.languages[k]}</li>;
                })

              }
              <img src={info.flag.svg} alt={info.flag.alt} width={400} height={200}/>

              {weather.temp  && 
              <div>
                  <h4>Weather in {info.name}</h4>
                  <label>temperature  : {weather.temp}</label><br/>
                  <label>wind         : {weather.wind}</label>
              </div>}

          </div>
        }
        
    </div>
  );
}

export default App;
