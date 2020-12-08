import React from "react"
import "./Results.css"

const tests = [
    ["Mt.Fuji","Yamanashi","3667","☆☆☆"],
    ["Mt.Tsukuba","Ibraki","889","☆☆"],
    ["Mt.Aso","Kumamoto","2000","☆☆☆☆"]
];

export default function Results(props){
    return (
        <div className="container">
            {tests.map((mountain) => (
                <div className="resultCard">
                    <div className="mountainInfo">
                        <div>{mountain[0]}</div>
                        <div>{mountain[1]}</div>
                        <div>{mountain[2]}m</div>
                        <div>Hardness : {mountain[3]}</div>
                    </div>
                    <div className="weatherInfo">
                        <div>{props.weatherData}</div>
                        <div>{props.weatherData}</div>
                        <div>{props.weatherData}</div>
                    </div>
                </div>
            ))}   
        </div>
    )
}