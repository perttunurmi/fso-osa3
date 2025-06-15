require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  } else {
    return ' '
  }
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

// let persons = [
//   {
//     id: '1',
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: '2',
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: '3',
//     name: 'Dan Abramov',
//     number: '39-23-6523122',
//   },
// ]

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is required',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number is required',
    })
  }

  Person.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      number: request.body.number,
    },
    { runValidators: true },
  )

    .then((person) => response.json(person))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is required',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number is required',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.pow(10, 10)),
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then((persons) => {
    const date = new Date()
    response.send(
      `<div><div>Phonebook has info for ${persons.length} people</div><div>${date}</div></div>`,
    )
  }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT | 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
