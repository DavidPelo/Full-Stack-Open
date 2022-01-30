import React, { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedbackHandler = () => {
    setGood(good + 1);
  }

  const neutralFeedbackHandler = () => {
    setNeutral(neutral + 1);
  }

  const badFeedbackHandler = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header />
      <Button onClick={goodFeedbackHandler} label={'good'}/>
      <Button onClick={neutralFeedbackHandler} label={'neutral'}/>
      <Button onClick={badFeedbackHandler} label={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App