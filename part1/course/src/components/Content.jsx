import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  return (
    <div>
        {parts.map(part => {
          
          console.log(part);
          return <Part part={part}/>
        })
        }
    </div>
  )
}

export default Content