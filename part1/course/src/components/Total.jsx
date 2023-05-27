import React from 'react'

const Total = (props) => {
  const exercises = props.parts.map(obj=>obj.exercise);
  const total     = exercises.reduce((partialSum, a) => partialSum+a, 0);
  return (
    <div>
        <p>Number of exercises {total}</p>
    </div>
  )
}

export default Total