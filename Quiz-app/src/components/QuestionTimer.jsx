import { useEffect, useState } from "react"

//props destructure here 
export default function QuestionTimer({timeout , onTimeout}){
    
    const [remainingTime , setRemainingTime] = useState(timeout)

    useEffect(()=>{
        console.log('SETTING TIMEOUT')
        setTimeout(onTimeout ,timeout)
    },[timeout,onTimeout])  // to make sure that this effect re executes if one of those dependencies changes

    // setTimeout(timeout,onTimeout)  //this timer would be recreated if we not use it in the useEffect

    // To make sure that this is not re executed  all the time but only when the dependecies chnge
    useEffect(()=>{
        setInterval(()=>{
            console.log('SETTING INTERVAL')
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
        },100)
    },[])

    
    return <progress id="question-time" max={timeout} value={remainingTime} />
}