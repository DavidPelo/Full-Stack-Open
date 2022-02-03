import React from "react";

function Input(props) {
  return (
    <div>
      {props.label}{": "}
      <input
        onChange={props.changeHandler}
        value={props.value}
        placeholder={props.text}
      />
    </div>
  );
}

export default Input;
