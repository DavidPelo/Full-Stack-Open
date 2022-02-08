import React from "react";
import Contact from "./Contact";

function ContactList(props) {
  const contacts = props.contacts;

  return (
    <div>
      {contacts.length !== 0 ? (
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDelete={props.onDeleteContact}
          />
        ))
      ) : (
        <p>Sorry, no contacts found</p>
      )}
    </div>
  );
}

export default ContactList;
