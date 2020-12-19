import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === personObject.name))
      return window.alert(
        `Cannot add name ${newName}: \n Name already exists.`
      );
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    if (search === "") {
      setShowAll(true);
      setSearch(event.target.value);
    }
    setShowAll(false);
    setSearch(event.target.value);
  };

  const peopleToShow = showAll
    ? persons
    : persons.filter((people) => {
        return (
          (people.name.toLowerCase().includes(search) ||
            people.number.toString().includes) === true
        );
      });

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Search People:
          <input value={search} onChange={handleSearchChange} />
        </div>
      </form>
      <h2>Add a New Person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map((person) => (
        <div key={person.name}>
          {person.name}: {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
