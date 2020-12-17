import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const Button = (props) => (
  <button onClick={props.handleClick}>{props.label}</button>
);

const MostVotes = ({ anecdotes, mostVote }) => {
  if (mostVote.length === 0) {
    return (
      <>
        <h2>Anecdotes With the Most Votes</h2>
        <p>User has not voted yet</p>
      </>
    );
  }
  //BUG handling multiple values leads to issues, temporary fix is to handle one the first index of the array
  let mostVoteDisplay = Object.entries(mostVote[0])[0];

  return (
    <>
      <h2>Anecdotes With the Most Votes</h2>
      <div>{mostVoteDisplay[0]}</div>
      <div>has {mostVoteDisplay[1]} votes</div>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(anecdotes[0]);
  const [vote, setVote] = useState({
    [anecdotes[0]]: 0,
    [anecdotes[1]]: 0,
    [anecdotes[2]]: 0,
    [anecdotes[3]]: 0,
    [anecdotes[4]]: 0,
    [anecdotes[5]]: 0,
  });
  const [mostVote, setMostVote] = useState([]);

  const handleSelected = function () {
    //selected is a random number generator that returns the indexed anecdote of the anecdotes array
    const min = Math.ceil(0);
    const max = Math.floor(anecdotes.length);
    const random = Math.floor(Math.random() * (max - min) + min);
    const newSelected = anecdotes[random];
    setSelected(newSelected); //The maximum is inclusive and the minimum is inclusive
  };

  function handleVote() {
    let newVote = { ...vote };
    newVote[selected] += 1;
    setVote(newVote);
    handleMostVote(newVote);
  }

  function handleMostVote(newVote) {
    //creates an array of values
    const valuesArr = Object.values(newVote);
    //outputs what value is the most
    const mostValue = Math.max(...valuesArr);
    const newMostVote = [];
    //pushes a new object of the max votes to an array, designed for multiple value handling
    Object.keys(newVote).forEach(function (key) {
      if (newVote[key] === mostValue) {
        let newObj = {
          [key]: newVote[key],
        };
        newMostVote.push(newObj);
        return;
      }
    });
    setMostVote(newMostVote);
  }

  return (
    <>
      <h2>Ancedotes</h2>
      <div>{selected}</div>
      <div>has {vote[selected]} votes</div>
      <Button handleClick={handleSelected} label="Change Anecdote" />
      <Button handleClick={() => handleVote(selected)} label="Vote" />
      <MostVotes {...{ vote, mostVote }} />
    </>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
