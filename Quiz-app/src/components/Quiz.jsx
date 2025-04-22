/*
  When user answer the question we want to move to next question -> useState
  Every question will come with multiple possible ans we want to store those answers ->useState
*/
import { useState , useCallback } from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz(){
    // Why this state managing way is not optimal here ?? --> one of the state here is redundant
    // const [activeQuestionIndex , setActiveQuestionIndex] =useState(0)

    /*
      Every time the quiz comp gets reevluated a new function of this recreated
    */
    const handleSelectAns = useCallback( function handleSelectAns(selectedAns){
        setUserAnswers((prevUserAns)=>{
            return [...prevUserAns , selectedAns]  //also stroting prev selected ans for other questions
        })
    },[])
   
    const handleSkipAns = useCallback(() => handleSelectAns(null),[handleSelectAns]);

    const [userAnswers, setUserAnswers] = useState([]) // we need to store user selected answers but we could derive active index from this also
    const activeQuestionIndex = userAnswers.length
    

    //we have to evlaute whether the quiz is over or not?
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    if(quizIsComplete){
        return (
            <div id = "summary">
              <img src= {quizCompleteImg} alt= "Trophy Icon" />
              <h2>Quiz Completed</h2>
            </div>
        );
    }
    // Shuffling answers
    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffleAnswers.sort(()=>Math.random -0.5);

    return (
        <div id = "quiz">
            <div id = "question">
              <QuestionTimer  
                timeout={10000} 
                onTimeout={handleSkipAns}/>  
              <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id= "answers">
                    {shuffleAnswers.map((answer) =>(
                        <li key = {answer} className="answer">
                        <button onClick={()=> handleSelectAns(answer)}>{answer}</button>
                    </li>
                    ))}
                </ul>
          </div>
        </div>
    )  
}