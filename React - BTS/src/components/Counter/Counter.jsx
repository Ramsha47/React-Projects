import { useState , memo , useCallback  , useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter= memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = useMemo(() =>isPrime(initialCount),[initialCount]); //directly being executed whenever this comp function chnge

  const [counter, setCounter] = useState(initialCount);

  /* these will be recreated everytime as an object in javascript and it will be a different object in memory
     than before the last execution of counter comp fucntion */
  // RECREATION here will be prevented with the special hook useCallback in conjuntion with memo()
  const handleDecrement= useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  },[])

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  },[])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
})

export default Counter

// Memo remembers the rendered output and only re-renders if props change.
// memo func will take a look at the props of you functional component and then compare it with the new
// props recieve at this if both have same values memo will prevent this functional component to execute(avoiding)

/*
   We should dont overuse memo 
   1. Use it as high up in the component  as possible(blocking a component execution will also block child components)
   2. Checking props with memo() cost performance.
   3. Dont use it on components where props will change frequently.

*/


/* useCallback hook needed sometime in conjuntion with memo to avoid un neccassry re executions */
