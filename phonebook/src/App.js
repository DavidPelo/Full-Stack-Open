import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import AddForm from "./components/AddForm";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    { name: "David Pelo", number: "39-89-6423122", id: 5 },
  ]);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        console.log('promise fulfilled')
      })
  }, [])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [contactList, setContactList] = useState(
    persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ))
  );

  const searchHandler = (e) => {
    const searchValue = e.target.value;

    if (searchValue.trim().length > 0) {
      const filteredContactList = persons
        .filter((person) => person.name.indexOf(searchValue) > -1)
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ));
      setContactList(filteredContactList);
    } else {
      setContactList(
        persons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))
      );
    }
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

    let newList = persons.concat(newNameObject);
    setPersons(persons.concat(newNameObject));
    setContactList(
      newList.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))
    );
    setNewName("");
    setNewNumber("");
  };

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
      <ContactList contacts={contactList} />
    </div>
  );
};

export default App;
