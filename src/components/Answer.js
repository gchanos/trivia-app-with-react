import React from "react";
import "./styles.css";

export default function Answer(props) {

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

    const unselected = {
        backgroundColor: "#transparent",
        color: "#4D5B9f",
        border: "1px solid #4D5B9E"
    }

    const selected = {
        backgroundColor: "#bfc8f1",
        color: "#fff",
        border: "none"
    }

    const incorrect = {
        backgroundColor: "#f29999",
        color: "#700a0a",
        border: "none"
    }

    const correct = {
        backgroundColor: "#cef7c1",
        color: "#092102",
        border: "none"
    }


    let optionStyles;

    if (props.value === props.selectedAnswer && !props.isChecked) {
        optionStyles = selected;
    }

    else if ((props.isChecked && props.value === props.selectedAnswer) && (props.value === props.correctAnswer)) {
        optionStyles = correct;
    }

    else if ((props.isChecked && props.value === props.selectedAnswer) && (props.value !== props.correctAnswer)) {
        optionStyles = incorrect;
    }

    else {
        optionStyles = unselected;
    }

    return (
        <div>
            <button style={optionStyles} className="option" onClick={props.clickHandler}>
                  {convertEntities(props.value)}
            </button>
        </div>
    )
}