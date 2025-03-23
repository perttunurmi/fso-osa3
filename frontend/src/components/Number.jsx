const Numbers = ({ persons, deletePerson }) => {
  return (
    persons.map((person) => {
      return (<li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person)}> Delete </button>
      </li >)
    })
  )
}

export default Numbers
