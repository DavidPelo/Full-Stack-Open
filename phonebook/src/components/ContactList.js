import React from "react";

function ContactList({ contacts }) {
  return (
    <div>
      {contacts.length !== 0 ? contacts : <p>Sorry, no contacts found</p>}
    </div>
  );
}

export default ContactList;
