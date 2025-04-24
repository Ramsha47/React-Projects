import { useState } from "react";
import { log } from "../../log";

export default function ConfigureCounter({onSet}){
  log('<Configured-Counter',1)

  const [enteredNumber, setEnteredNumber] = useState(0);
  
  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }
  
  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
   }
  return(
       <section id="configure-counter">
            <h2>Set Counter</h2>
            <input type="number" onChange={handleChange} value={enteredNumber} />
            <button onClick={handleSetClick}>Set</button>
        </section>
    );
}

/*
   This state that does execute this fucntion on every keystroke is now living in a seperate fucntional comp
   but Now the App comp will not execute on every keystroke in this configure counter
*/