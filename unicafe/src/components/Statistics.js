import React from "react";
import StatisticLine from './StatisticLine'

function Statistics(props) {
  const calculateAverage = () => {
    return (props.good * 1 + props.bad * -1) / (props.good + props.neutral + props.bad);
  };

  const calculatePositive = () => {
    return (props.good / (props.good + props.neutral + props.bad)) * 100;
  };

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>Sorry, there is currently no feedback available</p>;
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine title='good:' data={props.good}/>
            <StatisticLine title='neutral:' data={props.neutral}/>
            <StatisticLine title='bad:' data={props.bad}/>
            <StatisticLine title='average:' data={calculateAverage()}/>
            <StatisticLine title='positive:' data={calculatePositive()} unit='%'/>
          </tbody>
        </table>
      </>
    );
  }
}

export default Statistics;
