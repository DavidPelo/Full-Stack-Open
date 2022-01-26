import React from "react";
import Part from "./Part";

function Content(props) {
  return (
    <>
      <Part title={props.part1} noOfExercises={props.exercises1} />
      <Part title={props.part2} noOfExercises={props.exercises2} />
      <Part title={props.part3} noOfExercises={props.exercises3} />
    </>
  );
}

export default Content;
