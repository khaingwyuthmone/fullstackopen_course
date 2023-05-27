import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVote]        = useState({});
  

  const getRandom = (max) => Math.floor(Math.random() * max);
  const handler = () => {
    let random = getRandom(anecdotes.length);
    setSelected(random);
  }

  const voteHandler = () => {
    if(votes[selected]){
      let existingVote = votes[selected];
      let updatedVote = {
        ...votes,
        [selected] : existingVote+1
      }
      setVote(updatedVote);

    }else{
      let updatedVote = {
        ...votes,
        [selected] : 1
      }
      setVote(updatedVote);
    }
  }

  if(Object.keys(votes).length){
    var mostVotes = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
  }
  

  //setMostVote(mostVotes);

  return (
    <div>
      <h1>Anecdote of the day </h1>
        <blockquote style={{border : '2px solid gray', padding : '5px'}}>
          {anecdotes[selected]} 
          <br />
          <span style={{fontSize : 16, color: 'darkgray'}}>has {votes[selected] ? votes[selected] : 0} votes</span>
        </blockquote>
       
      
      
        <button onClick={voteHandler}>vote</button>
        <button onClick={handler}>next anecdote</button>

      <hr/>
      <h1>Anecdote with most votes</h1>
      {mostVotes && <>
        <blockquote style={{border : '2px solid gray', padding : '5px'}}>
          {anecdotes[mostVotes]} 
          <br />
          <span style={{fontSize : 16, color: 'darkgray'}}>has {votes[mostVotes]} votes</span>
        </blockquote>
      </>}
      

    </div>
  )
}

export default App