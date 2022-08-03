import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
  <tr>
    <td>{text}:</td><td>{value}</td>
  </tr>
  )
}

const FeedBack = ({header, buttons}) => {
  return (
    <div>
      <h1>
        {header}
      </h1>
      {buttons}
    </div>
  )
}

const Statistics = ({header, good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return(
    <div>
      <h1>{header}</h1>
      <h4>
        No FeedBack given
      </h4>
    </div>)
  }
  
  const arrayOfAllValues = []
    for (let i = 0; i < good; i++) {
      arrayOfAllValues.push(1);
    }
    for (let i = 0; i < neutral; i++) {
      arrayOfAllValues.push(0);
    }
    for (let i = 0; i < bad; i++) {
      arrayOfAllValues.push(-1);
    }


  const percentageOfGoodRatings = () => {
    return (arrayOfAllValues.filter(good => good === 1).length / arrayOfAllValues.length) * 100
  }
  
  const calculateAverage = () => {
    
  
     let total = arrayOfAllValues.reduce((partialSum, a) => partialSum + a, 0)
     return (total / arrayOfAllValues.length * 100 || '0');
     }

  return(
    <div>
      <h1>
        {header}
      </h1>
      <table>
          <tbody>
              <StatisticLine text='good' value={good}/>
              <StatisticLine text='neutral' value={neutral}/> 
              <StatisticLine text='bad' value={bad}/>      
              <tr><td>all:</td><td>{good + bad + neutral}</td></tr>
              <tr><td>average:</td><td>{calculateAverage()}</td></tr>
              <tr><td>positive:</td><td>{percentageOfGoodRatings()}%</td></tr>
          </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicked = () => {
    setGood(good + 1);
  }
  const handleNeutralClicked = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }
 
  const buttons = 
  <div>
    <Button text='good' onClick={handleGoodClicked} />
    <Button text='neutral' onClick={handleNeutralClicked} />
    <Button text='bad' onClick={handleBadClick} />
  </div>

  return (
    <div>
      <FeedBack header="give feedback" buttons={buttons} />
      <Statistics header="statistics" good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App