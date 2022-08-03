import { useState } from 'react'
import Display from './components/Display';
import Button from './components/Button';


const App = () => {
  const [ counter, setCounter ] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setZero = () => setCounter(0);
  const decreaseByOne = () => setCounter(counter - 1)


  const course =  {
    name:'Half Stack application development',
    parts: [
      {
        name: 'Fundementals of React',
        exercises: 10,
      },
       {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  };


  
  const Header = ({course}) => {
    return(<h1>{course}</h1>)
  }
  const Content = ({parts}) => {
    
    const content = parts.map(el =>  <p key={el.name + el.exercises}>{el.name}: {el.exercises}</p> )

    return(
      <>
        {content}
      </>
    )
  }

  const Total = ({parts}) => {
    
    let total = 0;
    parts.forEach(element => {
      
      total += element.exercises;
    });
    return(<p>Number of exercises: {total}</p>)
  }
  return (
    <div>
      <Display counter={counter} />
      <Button text='Add' onClick={increaseByOne} />
      <Button text='Minus' onClick={decreaseByOne} />
      <Button text='Reset' onClick={setZero} />
   
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
