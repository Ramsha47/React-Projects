export function useInput(defaultValue,validationFn){

     const [enteredValues , setEnteredValues] = useState(defaultValue);    // this is just the one possible way of handling inputs
     const [didEdit , setDidEdit] = useState(false);

     const valueIsValid = validationFn(enteredValues)
     
     function handleInputChange(event){
        setEnteredValues(event.target.value)
        setDidEdit(false)
      }
    
      function handleInputBlur(event){
        setDidEdit(true)
      }

     return {
        value : enteredValues,
        handleInputChange,
        handleInputBlur,
        hasError : didEdit && !valueIsValid ,
     }


}