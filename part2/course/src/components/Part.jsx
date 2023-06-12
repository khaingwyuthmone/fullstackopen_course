import React from 'react'

const Part = ({ part }) => {
  
  return (
    <div>
      <label>{part.name}</label> <label>{part.exercises}</label>
    </div>
  )
}

export default Part