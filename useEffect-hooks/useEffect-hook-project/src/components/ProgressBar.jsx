import { useState,useEffect } from "react";

export default function ProgressBar({timer}){
const [remaimingTime , setRemainingTime] =useState(timer)

 useEffect(()=>{
     console.log('INTERNVAL')
     const interval= setInterval(()=>{
        setRemainingTime((prevTime) => prevTime - 10)
    },10);

    return ()=>{
      console.log('Cleaning up time')
      clearInterval(interval)
     }
  },[])

  return <progress  value = {remaimingTime} max={timer}/>
}