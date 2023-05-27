import React from 'react'
import StatisticsLine from './StatisticsLine';

const Statistics = ({good, bad, neutral, average, percentage}) => {
    let feedback = good || bad || neutral;
  return (
    <>
        {feedback ? 
            <>
                <table>
                    <tbody>
                    <StatisticsLine text="good" value={good} />
                    <StatisticsLine text="neutral" value={neutral} />
                    <StatisticsLine text="bad" value={bad} />
                    

                    <StatisticsLine text="all" value={good+bad+neutral} />
                    <StatisticsLine text="average" value={average} />
                    <StatisticsLine text="positive" value={percentage} />
                    </tbody>
                </table>
                
               
            </>
            :
            <p>No feedback given</p>
        }
    </>  
    
  )
}

export default Statistics