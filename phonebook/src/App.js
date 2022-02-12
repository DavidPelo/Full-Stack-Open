import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import AddForm from "./components/AddForm";
import Notification from "./components/Notification";

import numberService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [notification, setNotification] = useState(null);

  const getPersons = () => {
    numberService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
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

    if (newNumber.trim() === "") {
      alert(`Please enter a number to be added to the phonebook`);
      return;
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} already exists in the phonebook`);
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (newName.trim() === "") {
      alert(`Please enter a name to be added to the phonebook`);
      return;
    } else if (existingPerson) {
      if (
        window.confirm(
          `${newName} already exists in the phonebook. Replace the old number with a new one?`
        )
      ) {
        let updateContactObject = {
          name: existingPerson.name,
          number: newNumber,
        };
        numberService
          .update(existingPerson.id, updateContactObject)
          .then((updatedContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedContact
              )
            );
            setNewName("");
            setNewNumber("");
            setNotification({
              error: false,
              message: `Updated ${updatedContact.name}`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch((error) => {
            setNotification({
              error: true,
              message: `Information of ${existingPerson.name} has already been removed from the server.`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          });
      }
      return;
    }

    let newNameObject = {
      name: newName,
      number: newNumber,
    };

    numberService.create(newNameObject).then((newNumber) => {
      setPersons([...persons, newNumber]);
      setNewName("");
      setNewNumber("");
      setNotification({
        error: false,
        message: `Added ${newNumber.name}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    });
  };

  const deleteContactHandler = (id) => {
    numberService.remove(id).then((deletedContact) => {
      setPersons(persons.filter((p) => p.id !== id));
      setNotification({
        error: false,
        message: `Contact deleted successfully`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    });
  };

  const contacts = !searchBy
    ? persons
    : persons.filter((person) => person.name.indexOf(searchBy) > -1);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
      <ContactList contacts={contacts} onDeleteContact={deleteContactHandler} />
    </div>
  );
};

export default App;
