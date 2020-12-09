import React, { useEffect } from "react";
import "./Results.css";
import Weather from "./Weather";
require('dotenv').config();

// const tests = [
//     ["Mt.Tsukuba","Kanto","Ibaraki","877","☆",36.221832446,140.103999584],
//     ["Mt.Bandai","Tohoku","Fukushima","1819","☆☆",37.600497598,140.06999972],
//     ["Mt.Aso","Kyusyu","Kumamoto","1592","☆",32.5304,131.0614],
//     ["Mt.Suisho","Chubu","Toyama","2986","☆☆☆☆",35.613056,138.780278],
// ];
const weathers = [["Date","weather","high","low"],["Date","weather","high","low"],["Date","weather","high","low"]]

export default function Results(props){
    //********************************************************************************************************
    //********************************************ステートの管理場所*********************************************
    //********************************************************************************************************
    //
    const [weatherInfo, setWeatherInfo] = React.useState([]);
    const [weather0, setWeather0] = React.useState("");
    const [tempHigh0, setTempHigh0] = React.useState("");
    const [tempLow0, setTempLow0] = React.useState("");

    const [weather1, setWeather1] = React.useState("");
    const [tempHigh1, setTempHigh1] = React.useState("");
    const [tempLow1, setTempLow1] = React.useState("");

    const [weather2, setWeather2] = React.useState("");
    const [tempHigh2, setTempHigh2] = React.useState("");
    const [tempLow2, setTempLow2] = React.useState("");
    //
    //********************************************************************************************************
    //********************************************ステートの管理場所*********************************************
    //********************************************************************************************************

    //********************************************************************************************************
    //********************************************条件に応じてフィルタリング***************************************
    //********************************************************************************************************
    //
    let filteredMaster = [...props.mountainMaster]
    if (props.region !== ""){
        filteredMaster = [...filteredMaster.filter((array) => array[1]===props.region)]
    }
    if (props.prefecture !== ""){
        filteredMaster = [...filteredMaster.filter((array) => array[2]===props.prefecture)]
    }
    if (props.hardness !== ""){
        filteredMaster = [...filteredMaster.filter((array) => array[4]===props.hardness)]
    }
    filteredMaster = [...filteredMaster.filter((array) => props.lowerLimit <= array[3] && array[3] <= props.higherLimit)]
    //
    //********************************************************************************************************
    //********************************************条件に応じてフィルタリング***************************************
    //********************************************************************************************************

    //********************************************************************************************************
    //********************************************緯度経度情報***************************************
    //********************************************************************************************************
    //
    let temp = [...filteredMaster]
    const latiLong = []

    for (let i = 0; i<temp.length; i++){
        latiLong[i] = []
        latiLong[i].push(temp[i][5])
        latiLong[i].push(temp[i][6])
    }
    //********************************************************************************************************
    //********************************************緯度経度情報***************************************
    //********************************************************************************************************

  
    //********************************************************************************************************
    //********************************************天気情報フェッチ***************************************
    //********************************************************************************************************
    //
    async function getWeatherData(latitude,longitude,day) {
        const apiKey = process.env.REACT_APP_OW_KEY;
        // console.log(apiKey)
        // const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=32.5304&lon=131.0614&units=metric&lang=ja&appid=" + apiKey)
        const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=metric&lang=ja&appid=" + apiKey)
        .then(response => response.json())
        // .then(json => console.log(json.daily[0]));
        .then(json => {
            setWeather0(json.daily[0].weather[0].description); 
            setTempHigh0(json.daily[0].temp.max);
            setTempLow0(json.daily[0].temp.min);

            setWeather1(json.daily[1].weather[0].description); 
            setTempHigh1(json.daily[1].temp.max);
            setTempLow1(json.daily[1].temp.min);

            setWeather2(json.daily[2].weather[0].description); 
            setTempHigh2(json.daily[2].temp.max);
            setTempLow2(json.daily[2].temp.min);
        })
    }

    //
    //********************************************************************************************************
    //********************************************天気情報フェッチ***************************************
    //********************************************************************************************************


    return (
        <div className="container">
            {filteredMaster.map((mountain) => (
                <div className="resultCard">
                    <div className="mountainInfo">
                        <div>{mountain[0]}</div>
                        <div>{mountain[2]}</div>
                        <div>{mountain[3]}m</div>
                        <div>Hardness : {mountain[4]}</div>
                    </div>
                    <div className="weatherInfo">
                        <Weather
                        getWeatherData = {getWeatherData}
                        lati = {mountain[5]}
                        long = {mountain[6]}
                        weather0 = {weather0}
                        tempHigh0 = {tempHigh0}
                        tempLow0 = {tempLow0}

                        weather1 = {weather1}
                        tempHigh1 = {tempHigh1}
                        tempLow1 = {tempLow1}

                        weather2 = {weather2}
                        tempHigh2 = {tempHigh2}
                        tempLow2 = {tempLow2}
                        />
                        {/* <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Weather</div>
                            <div>high</div>
                            <div>low</div>
                        </div> */}
                    </div>
                </div>
            ))}   
        </div>
    )
}