import React from "react";
import Start from "./components/Start";
import Question from "./components/Question";
import "./components/styles.css";
import { nanoid } from "nanoid";


export default function App() {
    const [gameStarted, setGameStarted] = React.useState(false)
    const [groupOfQuestions, setGroupOfQuestions] = React.useState([])
    const [isChecked, setIsChecked] = React.useState(false)
    const [notAllSelected, setNotAllSelected] = React.useState(false)

    const questionComponents = groupOfQuestions.map( question => {
        return (
            <Question
                key={question.id}
                id={question.id}
                question={question.question}
                clickHandler={selectOption}
                options={question.options}
                correctAnswer={question.correct_answer}
                selectedAnswer={question.selectedAnswer}
                isChecked={isChecked}
            />
        )
    })

    React.useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then(res => res.json())
            .then(data => setGroupOfQuestions(data.results.map( (result) => {
                return {
                        ...result,
                        id: nanoid(),
                        options: shuffle(result.incorrect_answers.concat(result.correct_answer)),
                        selectedAnswer: ""
                    }
            })))
    }, [gameStarted])

    function startTheGame() {
        setGameStarted(true)
    }

    function selectOption(value, questionId) {
            setGroupOfQuestions( prevGroup => prevGroup.map((question) => {
                if (question.id === questionId) {
                  if (question.selectedAnswer === "") {
                    return {...question, selectedAnswer: value}
                  } else {
                    return {...question, selectedAnswer: ""}
                  }
                } else {
                    return question
                }
            }))
    }
    

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function checkAnswers() {
        let allAnswered = true;
        groupOfQuestions.forEach( question => {
            if (question.selectedAnswer === "") {
                allAnswered = false;
                setNotAllSelected(true)
            }
        })

        if (allAnswered) {
            setIsChecked( prevChecked => !prevChecked)
            setNotAllSelected(false)

            if (isChecked) {
                setGameStarted(false)
            }
        }

    }

 
    function setScore() {
        let score = 0;

        groupOfQuestions.forEach( question => {
            if (question.correct_answer === question.selectedAnswer) {
                score = score + 10;
            }
        })

        return score;
    }

    return (
        <div className="app-container">
            <div className="background-blob-1">
                <img src="/images/blob-1.png" />
            </div>
            <div className="background-blob-2">
               <img src="/images/blob-2.png" />
            </div>

            { !gameStarted ? <Start startTheGame={startTheGame} /> 
                :
                <div className="questionnaire-container">
                    {questionComponents}


                    <div className="check-and-score-container">

                        <button onClick={checkAnswers} className="check-button">{ isChecked ? "Try again?" : "Check Answers"}</button>
                        { isChecked ? <div className="score"><h2> You scored: {setScore()}/100 </h2></div> : "" }
                        { notAllSelected ? <div className="score"><h2> Please select all the questions! </h2></div> : "" }
                    </div>  
                </div>

            }

        </div>
    )
}
