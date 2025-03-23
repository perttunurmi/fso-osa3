import { useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'
import axios from 'axios'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState('ok')

  const handleNewName = (event) => {
    console.log("onChange:", event.target.value)
    setName(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log("onChange: ", event.target.value)
    setNewNumber(event.target.value)
    setNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    persons.map((person) => person.name).includes(newName)

      ? window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)

        ? personsService.update(
          persons.find((person) =>
            person.name === personObject.name)
            .id, personObject)
          .then(_reponse => {
            personsService.getAll().then(response => {
              setPersons(response.data)
              setStatus("ok")
              setMessage(`Muutettiin ${personObject.name}`)
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            }
            )
          }).catch(_error => {
            setStatus("error")
            setMessage(`Information of ${personObject.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
          )
        : console.log("Ei lisätä")

      : personsService.create(personObject).then(response => {
        setPersons(persons.concat(response.data))
        setStatus("ok")
        setMessage(`Lisättiin ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })


    setName('')
    setNumber('')
    setNewName('')
    setNewNumber('')
    setFilter('')
  }

  const deletePerson = (person) => {
    window.confirm(`Delete ${person.name}?`)
      ? personsService.deleteFromDb(person.id).then(_response => {
        personsService.getAll().then(response => {
          setPersons(response.data)
          setStatus("ok")
          setMessage(`Poistettiin ${person.name}`)
          setTimeout(() => setMessage(null), 3000)
        })

      })
      : console.log("Ei poistetakkaan")
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <Phonebook filteredPersons={filteredPersons} handleFilter={handleFilter} handleNewName={handleNewName} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} name={name} number={number} deletePerson={deletePerson} message={message} style={status} />
  )
}

export default App
