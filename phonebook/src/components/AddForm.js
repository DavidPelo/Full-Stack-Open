import React from "react";
import Input from "./Input";
import Button from "./Button";

function AddForm(props) {
  return (
    <form>
      <div>
        {" "}
        <Input
          changeHandler={props.onNameChange}
          value={props.nameValue}
          label="name"
          text="add new names here..."
        />
      </div>
      <div>
        {" "}
        <Input
          changeHandler={props.onNumberChange}
          value={props.numberValue}
          label="number"
          text="add new numbers here..."
        />
      </div>
      <div>
        <Button submitHandler={props.onSubmit} text='add'/>
      </div>
    </form>
  );
}

export default AddForm;
