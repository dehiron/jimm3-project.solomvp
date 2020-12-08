import React from "react";
import "./Filter.css";

export default function FilterLocation(props){
    return (
        <div className = "container">
            <div className = "filter-wrapper">
                <div className="stepTitle">STEP1 - Choose Locations</div>
                <select
                    className = "region"
                    onChange={(e) => props.regionFunc(e.target.value)}
                    onBlur={(e) => props.regionFunc(e.target.value)}
                >
                    <option>Region</option>
                    {props.region.map((region,index) => (
                        <option key ={index}>{region}</option>
                    ))}
                </select>
                <select
                    className = "prefecture"
                    onChange={(e) => props.prefectureFunc(e.target.value)}
                    onBlur={(e) => props.prefectureFunc(e.target.value)}
                >
                    <option>Prefecture</option>
                    {props.prefecture.map((prefecture,index) => (
                        <option key ={index}>{prefecture}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}