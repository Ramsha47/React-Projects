/*
  When user answer the question we want to move to next question -> useState
  Every question will come with multiple possible ans we want to store those answers ->useState
*/
import { useState , useCallback} from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

export default function Quiz(){
    // Why this state managing way is not optimal here ?? --> one of the state here is redundant
    // const [activeQuestionIndex , setActiveQuestionIndex] =useState(0)
    const [userAnswers, setUserAnswers] = useState([]) // we need to store user selected answers but we could derive active index from this also
    
    const activeQuestionIndex =  userAnswers.length ;
    //we have to evlaute whether the quiz is over or not?
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    /*
      Every time the quiz comp gets reevluated a new function of this recreated
    */
      const handleSelectAns = useCallback( function handleSelectAns(selectedAns){
        setUserAnswers((prevUserAns)=>{
            return [...prevUserAns , selectedAns]  //also stroting prev selected ans for other questions
        });
    },[])

    const handleSkipAns = useCallback(() => handleSelectAns(null),[handleSelectAns]);

    if(quizIsComplete){
        return (
            <div id = "summary">
              <img src= {quizCompleteImg} alt= "Trophy Icon" />
              <h2>Quiz Completed</h2>
            </div>
        );
    }
    
    return (
        <div id = "quiz">
            <Question 
              key={activeQuestionIndex}
              index={activeQuestionIndex}
              onSelectAns={handleSelectAns}
              onSkipAns={handleSkipAns}
            />
        </div>
    )  
}

// Needs to split this component bcz this is getting bigger and complex

/* when this component execute the ansState changes and make answers shuffle re execute
   we only wanna make answers shuffle for once . As a React dev you should avoid using the useEffect usage bcs it 
   happens relatively quickly that you use UseEffecr wrong .

   You can use useRef Hook (you can use ref for managing values that are stored and manages independently from
   the component function lifecycle to which they belong )

*/