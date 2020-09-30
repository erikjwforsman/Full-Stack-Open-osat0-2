import React, {useState, useEffect} from "react"
import axios from "axios"

const ShowCountry = ({country}) =>{
  return(
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language=>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img  alt={"flag of" + country.name} src={country.flag} height="100"/>
    </div>
  )
}

const Teleport = ({onChange, country}) => {
  const retcontry = () => {
    onChange(country)
  }

  return(
      <button type="submit" key={country.name} onClick={retcontry}>show</button>
  )
}

const ListOfCountries = ({countrylist, onChange}) => {
  if (countrylist.length>10){
    return (<p>Too many matches, specify another filter</p>)
  }
  else if (countrylist.length>1) {

    return(
      <ul>
        {countrylist.map( country =>

          <p key={country.name}>{country.name} <Teleport country={country} onChange={onChange}/></p>

        )}
      </ul>
    )
  }
  else if (countrylist.length===0) {
    return(<p>No matches, remove letters</p>)
  }
  else{
    return (<ShowCountry country={countrylist[0]}/>)
  }
}

const Filter = ({filter, onChange}) => {
  return(
    <div>find countries <input value={filter} onChange={onChange}/></div>
  )
}

const App = () =>{
  const [countries, setCountries] = useState([])
  const [filter, setFilter]= useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response =>{
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

/////
  const handleTeleportChange = (retcontry) => {
    setFilter(retcontry.name)
  }
/////

  const filterCountries = (filter === "")
    ? countries
    : countries.filter(coutry =>
      coutry.name.toLowerCase().includes(filter.toLowerCase())
    )

  return(
    <div>
      <Filter value={filter} onChange={handleFilterChange}/>
      <ListOfCountries countrylist={filterCountries} onChange={handleTeleportChange}/>
    </div>
  )

}




export default App
