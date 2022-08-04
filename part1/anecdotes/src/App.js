

import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}> {text}</button> // scope level 0

// scope levels added for deepening my understanding of scope - compiler - engine innerworkings. 
const App = () => { // scope level 0
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const randomChoice = array => Math.floor(Math.random() * array.length + 1) // scope level 1
  
  const changeSelection = () => { // scope level 1
    
    const rand = randomChoice(anecdotes) - 1; // scope level 2
    rand === selected ? changeSelection() : setSelected(rand);
  }
  // scope level 1
  const addVote = () => {
    const array = points.map(num => num); // scope level 2
    array[selected] +=1
    let indexOfHighestValueInArray = array.indexOf(Math.max(...array)); // if there is a tie, the value is whatever comes first in the array i.e [0, 1, 5, 5] returns index[2] not [3].
    setMostVotes(indexOfHighestValueInArray)
    setPoints(array);
  }
  
  // scope level 1 (can only be used within app not outside... I mean unless passed through a prop..)
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0);
  
  // scope level 1
  const [points, setPoints] = useState( new Uint8Array(7))
  
  return (
    <div>
      <h2>Anectode Of The Day</h2>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <div>
        <Button text='vote' onClick={addVote} />
        <Button text='next anecdote' onClick={changeSelection} />
      </div>

      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotes]}
      <br/>
      has {points[mostVotes]} votes
    </div>
  )
}

export default App