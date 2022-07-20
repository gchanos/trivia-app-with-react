import { nanoid } from "nanoid";
import React from "react";
import "./styles.css";
import Answer from "./Answer";


export default function Question(props) {

    function convertEntities(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&quot;/g, '"');
        htmlStr = htmlStr.replace(/&#039;|&rsquo;/g, "'");
        htmlStr = htmlStr.replace(/&amp;/g, "&");
        htmlStr = htmlStr.replace(/&Uuml;/g, "Ü");
        htmlStr = htmlStr.replace(/&iacute;/g, "í");
        htmlStr = htmlStr.replace(/&uacute;/g, "ú");
        htmlStr = htmlStr.replace(/&ldquo; | &rdquo;/g, "'");
        return htmlStr;
    }

    
    const optionsComponents = props.options.map( option => {
        return (
            <Answer
                key={nanoid()}
                id={props.id}
                value={option}
                clickHandler={() => props.clickHandler(option, props.id)}
                correctAnswer={props.correctAnswer}
                selectedAnswer={props.selectedAnswer}
                isChecked={props.isChecked}
            />
        )
    })
        
    return (
        <div className="question-container">
            <h3 className="question">{convertEntities(props.question)}</h3>

            <div className="set-of-options">
                {optionsComponents}
            </div>
        </div>
    )
}