import React from "react"

const Part = ({props}) => {
  return (
    <div key={props.id}>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = ({props}) => {
  let ret = props.map(prop => <div key={prop.id}> <Part props={prop} /> </div> )

  return(ret)
}

const Total = ({props}) => {
  const total = props.parts.map(i => i.exercises)
  const summa =total.reduce((t, n) => t + n)

  return(
    <p><strong>total of {summa} exercises</strong></p>
  )
}

const Header = ({props}) => <h2>{props.name}</h2>

const Course = ({course}) =>{

  return(
    <div>
      <Header props={course} />
      <Content props={course.parts} />
      <Total props={course} />
    </div>
  )
}

const Courses = ({courses}) => {
  const ret = courses.map(course=> <Course key={course.id} course={course} />)

  return (
    <div>
      <h1>Web development curriculum</h1>
      {ret}
    </div>)
}

export default Courses
