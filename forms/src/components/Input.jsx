export default function Input(){
    return (
        <div className="control no-margin">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          name="email" 
          onBlur={()=>handleInputBlur('email')}
          onChange={(event)=>handleInputChange('email',event.target.value)}
          value={enteredValues.email}
         />
         <div className="control-error">
           {emailIsInvalid && <p>Please enter a valid email address</p>}
         </div>
      </div>
    );
}