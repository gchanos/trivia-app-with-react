import React from "react";
import "./styles.css";



export default function Start(props) {


    return (
        <div className="start-container">

            <div className="start-content">
                <h1 className="title">Quizzical</h1>
                <p className="description">Test your knowledge answering these questions!</p>

                <button onClick={props.startTheGame} className="start-button">Start Quiz!</button>
            </div>

        </div>
    )
}