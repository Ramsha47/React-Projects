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

    let timer = 10000;

    if(answer.selectedAnswer){
       timer = 1000;
    }
    if(answer.isCorrect !== null){
        timer = 2000;
    }

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
    if(answer.selectedAnswer && answer.isCorrect !== null){
        ansState = answer.isCorrect ? 'correct' : 'wrong'
    }else if(answer.selectedAnswer){
        ansState = "answered" ;
    }
    return(
        <div id = "question">
            <QuestionTimer 
                key={timer} 
                timeout={timer} 
                onTimeout={answer.selectedAnswer === '' ? onSkipAns : null}
                mode={ansState}
            />  
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