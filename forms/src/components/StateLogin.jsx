import { useState } from "react";

export default function Login() {

  const [enteredValues , setEnteredValues] = useState({
    email: '',
    password: ''
  });    // this is just the one possible way of handling inputs

  const [didEdit , setDidEdit] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = didEdit.email  &&  !enteredValues.email.includes('@') ;


  function handleSubmit(event){
    event.preventDefault();  // preventing the default browser behaviour
    console.log(enteredValues);
    setEnteredValues({
        email: '',
        password: ''
    })
  }

  function handleInputChange(identifier , value){
    setEnteredValues(prevValue =>({
      ...prevValue,
      [identifier] : value
    }))
    setDidEdit(prevEdit => ({
        ...prevEdit,
        [identifier] : false
    }))
  }

  function handleInputBlur(identifier ,){
    setDidEdit(prevEdit => ({
        ...prevEdit,
        [identifier] : true
    }))
  }

  return (
    <form onSubmit={handleSubmit}> 
      <h2>Login</h2>

      <div className="control-row">
        

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            name="password" 
            onChange={(event)=>handleInputChange('password',event.target.value)}
            value={enteredValues.password}
           />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
