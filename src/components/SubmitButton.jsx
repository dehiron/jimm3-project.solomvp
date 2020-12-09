import React from "react";
import "./Filter.css";

export default function SubmitButton(props){
    return (
        <div className="submit-button-container">
        {props.currentView ? (
            <button className="submit-button" onClick={()=>props.resultsView()}>Search Mountain!</button>
        ) : (
            <button className="submit-button" onClick={()=>props.filterView()}>Reset Results</button>
        )}            
        </div>
    )
}