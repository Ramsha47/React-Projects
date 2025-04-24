import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount){
    setChosenCount(newCount)
  }

  // state chnges and re execution of child component cannot trigger the execution of parent component
  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />  
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;

//problematic use case here for optimization

/*
  When I'll enter a number in an input feild a bunch of components  executed why is that happening here?
  beacuse this input feild is directly lies in the App component and I have onChange={handleChange} on input feild
  and therefore on every key stroke some states changes 

  There are two approaches to this solution
  1. First one is using memo fucntion to wrap around that will prevent 
     uneccessary component function execution
  2. Second one is clever component composition (sepration of component)
*/