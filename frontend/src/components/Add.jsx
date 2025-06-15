import PropTypes from 'prop-types'

const Add = ({ handleNewName, handleNewNumber, handleSubmit, name, number }) => {
  return (
    <>
      <div>
        name: <input onChange={handleNewName} value={name} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={number} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </>
  )
}

Add.propTypes = {
  handleNewName: PropTypes.func,
  handleNewNumber: PropTypes.func,
  handleSubmit: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string
}


export default Add
