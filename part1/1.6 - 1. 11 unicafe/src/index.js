import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    const newValue = good + 1;
    setGood(newValue);
  };

  const handleNeutral = () => {
    const newValue = neutral + 1;
    setNeutral(newValue);
  };

  const handleBad = () => {
    const newValue = bad + 1;
    setBad(newValue);
  };

  return (
    <>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
