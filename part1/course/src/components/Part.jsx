import React from 'react'

const Part = ({ part }) => {
  
  return (
    <div>
      <label>{part.name}</label> <label>{part.exercise}</label>
    </div>
  )
}

export default Part