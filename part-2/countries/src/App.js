import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, detail, filter }) => {
  const [weather, setWeather] = useState([])
  const languages = []
  for (const language in country.languages) {
    languages.push(country.languages[language])
  }
  const api_key = process.env.REACT_APP_API_KEY
  const capital = country.capital
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  if (detail === "T") {
    return (
      <div>
        <h2>{country.name.common}</h2>
        capital {country.capital}
        <br />
        area {country.area}
        <br />
        <h4>languages:</h4>
        <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
        <img src={Object.values(country.flags)[0]} />
        <h2>Weather in {capital}</h2>
        temperature {weather.main.temp} Celcius
        <br />
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <br />
        wind {weather.wind.speed} m/s
      </div>
    )
  } else {
    return (
      <div>
        {country.name.common}
        <button onClick={() => filter(country.name.common)}>show</button>
      </div>
    )
  }
}

const Countries = ({ countriesToShow, filter }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => <Country key={country.name.common} country={country} detail={"F"} filter={filter} />)}
      </div>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country => <Country key={country.name.common} country={country} detail={"T"} filter={filter} />)}
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const countriesToShow = countries.filter(country => {
    if (newFilter === '') {
      return countries
    } else {
      return country.name.common.toLocaleLowerCase().includes(newFilter.toLowerCase())
    }
  })
  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} filter={setNewFilter} />
    </div>
  )
}

export default App;