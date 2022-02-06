import React from "react";

function Country(props) {
  const showCountryProfileHandler = () => {
    props.showProfileHandler(props.name);
  }

  return (
    <div>
      <span>{props.name}</span>
      <button onClick={showCountryProfileHandler}>Show</button>
    </div>
  );
}

export default Country;
