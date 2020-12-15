import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
  if (!total) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {percentage} %</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleGood = () => {
    const newValue = good + 1;
    setGood(newValue);
    setTotal(total + 1);
    handleAverage();
    handlePercentage();
  };

  const handleNeutral = () => {
    const newValue = neutral + 1;
    setNeutral(newValue);
    setTotal(total + 1);
    handlePercentage();
  };

  const handleBad = () => {
    const newValue = bad + 1;
    setBad(newValue);
    setTotal(total + 1);
    handleAverage();
    handlePercentage();
  };

  const handleAverage = () => {
    //getting the current difference of good and bad
    //BUG clicking good and then bad leads to a positive average
    const difference = good - bad;
    setAverage(difference / 2);
  };

  const handlePercentage = () => {
    //BUG returns NaN on some results
    const newPercentage = (good / total) * 100;
    setPercentage(newPercentage);
  };

  return (
    <>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <Statistics {...{ good, neutral, bad, total, average, percentage }} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
