import React from "react";

function StatisticLine(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.data}{props.unit}</td>
    </tr>
  );
}

export default StatisticLine;
