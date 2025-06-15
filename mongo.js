const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://perttunurmi:${password}@cluster0.0is8uux.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonenumber = mongoose.model("Phonenumber", numberSchema);

if (process.argv.length >= 4) {
  const name = process.argv[3];
  const number = process.argv[4];

  const phonenumber = new Phonenumber({
    name: name,
    number: number,
  });

  phonenumber.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("phonebook:");
  Phonenumber.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
