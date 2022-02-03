import React from "react";

function Button(props) {
  return (
    <button type="submit" onClick={props.submitHandler}>
      {props.text}
    </button>
  );
}

export default Button;
