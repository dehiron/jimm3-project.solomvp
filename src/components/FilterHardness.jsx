import React from "react";
import "./Filter.css"



export default function FilterHardness(props){
    
    return (
        <div className = "container">
            <div className = "filter-wrapper">
                <div className="stepTitle">STEP2 - Choose Hardness</div>
                <span>Easy</span>
                <button className="hardness" value="☆" onClick={(e) => props.hardnessFunc(e.target.value)}>☆</button>
                <button className="hardness" value="☆☆" onClick={(e) => props.hardnessFunc(e.target.value)}>☆☆</button>
                <button className="hardness" value="☆☆☆" onClick={(e) => props.hardnessFunc(e.target.value)}>☆☆☆</button>
                <button className="hardness" value="☆☆☆☆" onClick={(e) => props.hardnessFunc(e.target.value)}>☆☆☆☆</button>
                <button className="hardness" value="☆☆☆☆☆" onClick={(e) => props.hardnessFunc(e.target.value)}>☆☆☆☆☆</button>
                <span>Hard</span>
            </div>
        </div>
    )
}