import { useState } from "react";
import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {

  const { 
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('' , (value)=>isEmail(value) && isNotEmpty(value));

   const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError
   } = useInput('',(value) => hasMinLength(value,6))


  function handleSubmit(event){
    event.preventDefault();  // preventing the default browser behaviour
    
    if(emailHasError || passwordHasError){
        return;
    }
    console.log(emailValue , passwordValue)
  }


  return (
    <form onSubmit={handleSubmit}> 
      <h2>Login</h2>

      <div className="control-row">
        <Input 
            label="Email" 
            id="email" 
            name= "email" 
            type = "email"
            onBlur = {handleEmailBlur}
            onChange={handleEmailChange}
            value={emailValue}
            error={emailHasError && "please enter a valid email"}
        />
        <div className="control no-margin">
          <Input 
            label="Password" 
            id="password" 
            name= "password" 
            type = "password"
            onBlur = {handlePasswordChange}
            onChange={handlePasswordBlur}
            value={passwordValue}
            error={passwordHasError && "please enter valid password"}
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
