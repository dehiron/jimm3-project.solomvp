import React, { useEffect } from "react";
import "./Results.css";
require('dotenv').config();

export default function Weather(props){

    const lati = props.lati;
    const long = props.long
    const high = `Highest : ${props.tempHigh}℃`
    const low = `Lowest : ${props.tempLow}℃`

    return (
        <div className="weather">
            <div>
                <div className="hoge" onClick={()=>props.getWeatherData(lati,long,0)}>1DAY</div>
                <div>{props.weather0}</div>
                <div>Highest {props.tempHigh0}℃</div>
                <div>Lowest {props.tempLow0}℃</div>
            </div>
            <div>
                <div className="hoge" onClick={()=>props.getWeatherData(lati,long,1)}>2DAYS</div>
                <div>{props.weather1}</div>
                <div>Highest {props.tempHigh1}℃</div>
                <div>Lowest {props.tempLow1}℃</div>
            </div>
            <div>
                <div className="hoge" onClick={()=>props.getWeatherData(lati,long,2)}>3DAYS</div>
                <div>{props.weather2}</div>
                <div>Highest {props.tempHigh2}℃</div>
                <div>Lowest {props.tempLow2}℃</div>
            </div>
        </div>
    )

}