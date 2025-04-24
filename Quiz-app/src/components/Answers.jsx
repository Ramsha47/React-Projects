import { useRef } from "react";

export default function Answers({
    answers , 
    selectedAns , 
    ansState , 
    onSelect
 }) {

    const shuffledAnswers = useRef()
    // Shuffling answers
    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(()=>Math.random -0.5);
    }

    return(
        <ul id= "answers">
            {shuffledAnswers.current.map((answer) =>{
            const isSelected = selectedAns === answer
            let cssClass = ''

            if(ansState === 'answered' && isSelected) {
                cssClass = 'selected'
            }
            if((ansState === 'correct' || ansState === 'wrong') && isSelected){
                cssClass = ansState;
            }

            return(
                    <li key = {answer} className="answer">
                        <button 
                            onClick={()=> onSelect(answer)} 
                            className={cssClass}
                            disabled= {ansState !== ''}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
         </ul>

    );
}