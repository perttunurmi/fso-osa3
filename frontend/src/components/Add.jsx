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

export default Add
