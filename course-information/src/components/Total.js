import React from "react";

function Total({ parts }) {
  const total = parts
    .map((part) => part.exercises)
    .reduce((runningTotal, num) => runningTotal + num, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
}

export default Total;
