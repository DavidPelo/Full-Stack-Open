import React from "react";
import Part from "./Part";

function Content(props) {
  return (
    <>
      <Part title={props.parts[0].name} noOfExercises={props.parts[0].exercises} />
      <Part title={props.parts[1].name} noOfExercises={props.parts[1].exercises} />
      <Part title={props.parts[2].name} noOfExercises={props.parts[2].exercises} />
    </>
  );
}

export default Content;
