import React from "react";

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

export default function Content(props) {
  //object destructuring the props for convenience
  const { part1, part2, part3 } = props.parts;
  const { exercises1, exercises2, exercises3 } = props.exercises;
  return (
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  );
}
