import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, remove }) => {
  return (
    <div>
      {person.name} {person.number} <button id={person.id} name={person.name} onClick={remove}>delete</button>
    </div>
  )
}

const Filter = ({ filter, handler }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handler} />
    </div>
  )
}

const PersonForm = ({ name, number, nameHandler, numberHandler, submit }) => {
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name: <input value={name} onChange={nameHandler} />
          <br />
          number: <input value={number} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ personsToShow, remove }) => {
  return (
    <div>
      {personsToShow.map(person => <Person key={person.id} person={person} remove={remove} />)}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

const Error = ({ error }) => {
  if (error === null) {
    return null
  }
  return (
    <div className="error">
      {error}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(x => x.name === newName).length > 0) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a one?`)) {
        return
      }
      const person = persons.find(person => person.name === newName)
      const personObject = {
        name: person.name,
        number: newNumber,
        id: person.id
      }
      personService
        .update(person.id, personObject)
        .then(updatedPerson => {
          const copy = [...persons]
          for (let p in copy) {
            if (copy[p].name === person.name) {
              copy[p].number = newNumber
              break
            }
          }
          setPersons(copy)
          setMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError(error.response.data.error)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setMessage(`Added ${addedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError(error.response.data.error)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }
  const removePerson = (event) => {
    if (!window.confirm(`Delete ${event.target.name} ?`)) {
      return
    }
    event.preventDefault()
    personService
      .remove(event.target.id)
      .then(removedPerson => {
        const copy = [...persons]
        for (let person in copy) {
          if (copy[person].id === event.target.id) {
            copy.splice(parseInt(person), 1)
            break
          }
        }
        setPersons(copy)
        setMessage(`Removed person successfully`)
        setTimeout(() => {
          setMessage(null)
        }, 2500)
      })
      .catch(error => {
        setError(`This person has already been removed from the server`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => {
    if (newFilter === '') {
      return persons
    } else {
      return person.name.toLocaleLowerCase().includes(newFilter.toLowerCase())
    }
  })
  return (
    <div>
      <h2>Phonebook</h2>
      <Error error={error} />
      <Notification message={message} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} submit={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} remove={removePerson} />
    </div>
  )
}

export default App