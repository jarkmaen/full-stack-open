const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total props={props.course.parts} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ props }) => {
  const sum = props.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      <p><b>total of {sum} exercises</b></p>
    </div>
  )
}

export default Course