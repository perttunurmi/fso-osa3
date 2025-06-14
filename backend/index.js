require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();
app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (request) => {
  if (request.method == "POST") {
    return JSON.stringify(request.body);
  } else {
    return " ";
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "39-23-6523122",
  },
];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id != id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name is required",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number is required",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.pow(10, 10)),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const date = new Date();
    response.send(
      `<div><div>Phonebook has info for ${persons.length} people</div><div>${date}</div></div>`,
    );
  });
});

const PORT = process.env.PORT | 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
