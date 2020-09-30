import React, {useState, useEffect} from "react"
import numberService from "./services/numbers"
import "./index.css"

const RemoveButton = ({handleRemove, person}) => {
  const removeNumber = () => {
    handleRemove(person)
  }

  return (<button onClick={removeNumber}>delete</button>)
}

const PrintPerson = ({person, handleRemove}) => {
  return(<p>{person.name} {person.number} <RemoveButton key={person.id} person={person} handleRemove={handleRemove}/></p>)
}

const AddPerson = ({onSubmit, name, number}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name.value} onChange={name.onChange}/>
      </div>
      <div>
        number: <input value={number.value} onChange={number.onChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FiltterIt = ({newFilter, onChange}) => {
  return(<div>
      filter <input value={newFilter} onChange={onChange}/>
    </div>)
}

const Notification =({message}) => {
  if (message===null){
    return null
  }
  //console.log("ilmoitus aktivoitu")
  return (
    <div className="getMessage">
      {message}
    </div>
  )
}

const ErrorNotification =({errorMessage}) => {
  if (errorMessage===null){
    return null
  }
  return(
    <div className="getErrorMessage">{errorMessage}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    numberService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const newObject ={
      name: newName, number: newNumber,
    }

    if (newObject.number.length<1 | newObject.name.length<1){
      alert("Fill both name and number")
      return
    }

    const check=persons.map(person => person.name)

    //Tästä päivitys
    if (check.includes(newObject.name)){
      const wantedPerson= persons.find(person => person.name===newObject.name)
      wantedPerson.number=newObject.number

      if(window.confirm(`${newObject.name} is already added to phonebook, replace the old number with a new one?`)){
        numberService
          .edit(wantedPerson)
          .then(() =>{
            setPersons(persons)
            setNewName("")
            setNewNumber("")
            setMessage(`you update ${wantedPerson.name} to ${wantedPerson.number}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error =>{
            setErrorMessage(`${wantedPerson.name} was already removed`)
            setTimeout(() => {
              window.location.reload()
            }, 3000)
          })
      }

    } else {
      numberService
        .create(newObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setMessage(`you added ${newObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  //Tähän poisto
  const cutNumber = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      numberService
        .remove(person.id)
        .then(() =>{
          setMessage(`${person.name} will be removed in few seconds`)
          setTimeout(() => {
            window.location.reload()
          }, 3000)
          //
        })
    }
  }

  ////////Handlet
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleRemove = (person) => {
    cutNumber(person)
  }

  const filterNames = (newFilter === "")
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />

      <FiltterIt value={newFilter} onChange={handleFilterChange}/>

      <h2>add a new</h2>

      <AddPerson onSubmit={addNumber}
          name={{value: newName, onChange:handleChange}}
          number={{value: newNumber, onChange: handleNumberChange}}/>

      <h2>Numbers</h2>

      <ul>
        {filterNames.map(person =>
            <PrintPerson key={person.name} person={person} handleRemove={handleRemove}/>
        )}
      </ul>
    </div>
  )
}

export default App
