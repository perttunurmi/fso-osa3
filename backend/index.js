const express = require("express");
const morgan = require("morgan");
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

app.get("/api/persons", (_request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    return response.json(person);
  } else {
    response.status(404).end();
  }
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

  if (persons.find((person) => person.name === body.name) !== undefined) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.pow(10, 10)),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/info", (_request, response) => {
  const date = new Date();
  response.send(
    `<div><div>Phonebook has info for ${persons.length} people</div><div>${date}</div></div>`,
  );
});

const PORT = process.env.PORT | 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
