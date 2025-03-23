import Numbers from './Number'
import Filter from './Filter'
import Add from './Add'
import Notification from './Notification'

const Phonebook = ({ filteredPersons, handleFilter, handleNewName, handleNewNumber, handleSubmit, name, number, deletePerson, message, style }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <form>
        <Add handleNewName={handleNewName} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit} name={name} number={number} />
      </form>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default Phonebook
