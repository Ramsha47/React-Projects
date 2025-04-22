import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  // Problem 1
  /* modal comp always renderd but its visibility is controlled by open prop
     this comp is always the part of the DOM and therefore this timer will actually be started 
     and set when the app components render for the first time
  */
  console.log('Timer Setting ..',)

  /*
    Problem 2 solution : UseEffect bcz this is sideeffect not related to direct code
    cleaning the timer with useEffect . The clean up function runs right before this effect 
    function runs again
  */

  useEffect(()=>{
    const timer = setTimeout(()=>{
      onConfirm();  
    },3000);
    //run before this comp dismounts
    return ()=>{
     console.log('Cleaning up time')
     clearTimeout(timer)
    }
  },[])

  /*
   When you add funtion as dependecy there is a danger to create infinite loops 
   onConfirm is functional dependency have handleremovefucntion as object so every time
   this app comp executes handleRemove fun also recreates 
   For this problem the saver way is another react hook
  */
  
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}

// PROBLEM 2
/* 
   If I click yes on delete confirmation modal before timer expires this timer will also still expire bcz
   we did not stop it . The problem will be in no case even when no clicked the item will disappear bcz timer
   never stopped when this component here is not rendered anymore
*/
