import { useRef , useState} from "react";

export default function Login() {

  const email = useRef();
  const password = useRef();

  const [emailIsInvalid , setEmailIsInvalid] = useState(false)

  function handleSubmit(event){
    event.preventDefault();  // preventing the default browser behaviour
    const enteredEmail = email.current.value
    const enteredPassword = password.current.value

    const emailIsValid = enteredEmail.includes('@')
    if(!emailIsValid){
      setEmailIsInvalid(true)
      return
    }
    setEmailIsInvalid(false) // make sures thta if we submit valid one the error disappears
    console.log("sending http req ...");
  }

  return (
    <form onSubmit={handleSubmit}> 
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            name="email" 
            ref={email}
           />
             <div className="control-error">
             {emailIsInvalid && <p>Please enter a valid email address</p>}
           </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            name="password" 
            ref={password}
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
