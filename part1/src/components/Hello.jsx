import React from 'react'


const Hello = props => {
    console.log(`Props of ${Hello.name} are :`, props)
  return (
    <div>Hello {props.name} , You are {props.age} years old.</div>
  )
}



export default Hello