import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import AddForm from "./components/AddForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const getPersons = () => {
    axios.get("http://localhost:3002/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(getPersons, []);

  const searchHandler = (e) => {
    setSearchBy(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const addNewNameHandler = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`);
      return;
    } else if (newName.trim() === "") {
      alert(`Please enter a name to be added to the phonebook`);
      return;
    }

    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} already exists in the phonebook`);
      return;
    } else if (newNumber.trim() === "") {
      alert(`Please enter a number to be added to the phonebook`);
      return;
    }

    let newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newNameObject));
    setNewName("");
    setNewNumber("");
  };

  const contacts = !searchBy
    ? persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))
    : persons
        .filter((person) => person.name.indexOf(searchBy) > -1)
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ));

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar onChange={searchHandler} text="search" />
      <h2>add a new</h2>
      <AddForm
        onNameChange={nameChangeHandler}
        nameValue={newName}
        onNumberChange={numberChangeHandler}
        numberValue={newNumber}
        onSubmit={addNewNameHandler}
      />
      <h2>Numbers</h2>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
