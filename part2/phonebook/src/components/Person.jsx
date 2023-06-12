
import React from 'react'

const Person = ({person, deletePhonebook}) => {
  return (
    <>
        <div>
          <li key={person.name}>{person.name}  :  {person.number}</li> 
          <button onClick={deletePhonebook}>delete</button>
        </div>
       
    </>
    
  )
}

export default Person