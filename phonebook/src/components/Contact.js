import React from "react";

function Contact(props) {
  const deleteHandler = () => {
    props.onDelete(props.id);
  }

  return (
    <>
      <p>
        {props.name} {props.number}
      </p>
      <button onClick={deleteHandler}>delete</button>
    </>
  );
}

export default Contact;
