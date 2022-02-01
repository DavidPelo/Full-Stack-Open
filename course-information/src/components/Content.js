import React from "react";
import Part from "./Part";

function Content({ parts }) {
  return (
    <>
      {parts.map(part => <Part key={part.id} title={part.name} noOfExercises={part.exercises} />)}
    </>
  );
}

export default Content;
