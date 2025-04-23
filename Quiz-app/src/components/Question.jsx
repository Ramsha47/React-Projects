import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from '../questions';

export default  function Question({
    index,
    onSelectAns , 
    onSkipAns,
 }){
    const [answer , setAnswer]=useState({
        selectedAnswer : '',
        isCorrect : null
    })

    function handleSelectAns(answer){
        setAnswer({
            selectedAnswer : answer,
            isCorrect : null
        })

        setTimeout(()=>{
            setAnswer({
                selectedAnswer : answer,
                isCorrect : QUESTIONS[index].answers[0] === answer
            })
            setTimeout(()=>{
              onSelectAns(answer)
            },2000)
        },1000)
    }

    let ansState = ''
    if(answer.selectedAnswer){
        ansState = answer.isCorrect ? 'correct' : 'wrong'
    }
    return(
        <div id = "question">
            <QuestionTimer  
                timeout={10000} 
                onTimeout={onSkipAns}/>  
            <h2>{QUESTIONS[index].text}</h2>
            <Answers 
                answers={QUESTIONS[index].answers}
                selectedAns={answer.selectedAnswer}
                ansState={ansState}
                onSelect={handleSelectAns}
            />
       </div>
    );
}