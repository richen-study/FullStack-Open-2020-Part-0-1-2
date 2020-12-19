import React from "react";

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts
    .map((part) => part.exercises)
    .reduce((a, b) => a + b, 0);
  return (
    <p>
      <strong>Total number of exercises {sum}</strong>
    </p>
  );
};

export default function Course({ course }) {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
}
