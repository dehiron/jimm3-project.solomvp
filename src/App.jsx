// import logo from './logo.svg';
import React from "react";
import './App.css';
import FilterLocation from "./components/FilterLocation.jsx";
import FilterHardness from "./components/FilterHardness.jsx";
import FilterSlider from "./components/FilterSlider.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import Results from "./components/Results.jsx"
import locationData from "./utils/locationData.json";
import { useEffect } from "react";
require('dotenv').config();

function App() {

  //********************************************************************************************************
  //********************************************ステートの管理場所*********************************************
  //********************************************************************************************************
  //
  //
  const [ regionArray, setRegions ] = React.useState([""])
  const [ prefectureArray, setPrefectures ] = React.useState([""])
  const [ region, setRegion ] = React.useState("")
  const [ prefecture, setPrefecture ] = React.useState("")  
  const [ hardness, setHardness ] = React.useState("")
  const [ lowerLimit, setLowerLimit] = React.useState("0")
  const [ higherLimit, setHigherLimit] = React.useState("3667")
  const [resultCards, setResultCards] = React.useState();
  const [view, setView] = React.useState(true);
  const [weatherInfo, setWeatherInfo] = React.useState([]);
  //
  //
  //********************************************************************************************************
  //********************************************ステートの管理場所*********************************************
  //********************************************************************************************************


  const initializeLocations = () => {
    setRegions(locationData.map((location) => location.region));
    setPrefectures([
      ...new Set(
        locationData.map((location) => location.prefectures.map((prefecture) => prefecture.name)).flat()
      ),
    ]);
  };

  useEffect(() => {
    initializeLocations();
  }, [])

  //********************************************************************************************************
  //**************************ステートアップデートの為の関数等。子コンポーネントに渡る。******************************
  //********************************************************************************************************
  //
  //
  //ここしっかり理解しよう（書き方）
  function regionUpdate(val) {
    setRegion(val);
    const matchedRegion = locationData.find(
      (location) => location.region === val
    );
    if (matchedRegion) {
      setPrefectures([...new Set(matchedRegion.prefectures.map((prefecture) => prefecture.name))]);
    }
  }
  //ステートの管理するためにやはり必要
  function prefectureUpdate(val) {
    setPrefecture(val);
  }

  function hardnessUpdate(val) {
    setHardness(val);
  }

  function lowerLimitUpdate(val) {
    setLowerLimit(val);
  }

  function higherLimitUpdate(val) {
    setHigherLimit(val);
  }
  //
  //
  //********************************************************************************************************
  //**************************ステートアップデートの為の関数等。子コンポーネントに渡る。******************************
  //********************************************************************************************************


  //********************************************************************************************************
  //**********************************************toggle関数たち*********************************************
  //********************************************************************************************************
  //
  //
  async function toggleResultsView() {
    let first = "";
    let second = "";
    if (region.toString() !== "" && region.toString() !== "Region")
      first = `region=${region}`;
    if (prefecture.toString() !== "" && prefecture.toString() !== "Prefecture")
      second = `prefecture=${prefecture}`;
    //暫定的にここに置いてる
    setView(false)
    // API作ってから使う
    // let pan;
    // await fetch(`/api/locations?${first}&${second}&${third}`)
    //   .then((data) => data.json())
    //   .then((data) => data.map((element) => element.locations))
    //   .then((arr) => {
    //     pan = arr;
    //     const master = [];
    //     for (let i = 0; i < arr.length; i++) {
    //       master[i] = [];
    //       master[i].push(arr[i].name);
    //       master[i].push(arr[i].preferred_name);
    //       master[i].push(arr[i].address);
    //       master[i].push(arr[i].city);
    //       master[i].push(arr[i].highway);
    //       master[i].push(arr[i].state);
    //       master[i].push(arr[i].zip_code);
    //       master[i].push(arr[i].phone);
    //       master[i].push(arr[i].email);
    //       //getting an array of restaurant names
    //       const tempRest = [];
    //       for (const item of arr[i].concepts) {
    //         tempRest.push(item.c_name);
    //       }
    //       master[i].push(tempRest);
    //       //getting an arrays of truck and services
    //       const tempTruck = [];
    //       const tempServices = [];
    //       for (const item of arr[i].facilities) {
    //         if (item.f_section === "Select Amenities") {
    //           tempServices.push(item.f_display_name);
    //         } else {
    //           tempTruck.push(item.f_display_name);
    //         }
    //       }
    //       master[i].push(tempServices);
    //       master[i].push(tempTruck);
    //     }
    //     setResultCards(master);
    //   })
    //   .then(() =>
    //     changeCoordinates({
    //       position: { lat: pan[0].latitude, lng: pan[0].longitude },
    //     })
    //   )
    //   // .then(() => getLocations(pan.locations))
    //   .catch((err) => console.log(err));
    // setView(false);
  }

  function toggleFilterView() {
    setView(true);
    setRegion("");
    setPrefecture("");
    setHardness("");
    setLowerLimit(0);
    setHigherLimit(3667);
    initializeLocations();
  }
  //
  //
  //********************************************************************************************************
  //**********************************************toggle関数たち*********************************************
  //********************************************************************************************************
  

  //********************************************************************************************************
  //************************************Fetch data from openWeather API*************************************
  //********************************************************************************************************
  //
  //とりあえずテストとしてここにおく。最終的にはResultのページに、取得した山の緯度経度情報を元にfetchして取得する。

  
  async function getWeatherData() {
    const apiKey = process.env.REACT_APP_OW_KEY;
    console.log(apiKey)
    const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&lang=ja&appid=' + apiKey)
    .then(response => response.json())
    // .then(json => console.log(json.daily));
    .then(json => setWeatherInfo(json.daily[0].dt));
  }

  // getWeatherData()

  //
  //
  //********************************************************************************************************
  //************************************Fetch data from openWeather API*************************************
  //********************************************************************************************************





  //********************************************************************************************************
  //*****************************************************Return*********************************************
  //********************************************************************************************************
  //
  //
  return (
    <div className="App">
      {view ? (
        <div className>
          <FilterLocation 
            region = {regionArray}
            prefecture = {prefectureArray}
            regionFunc = {regionUpdate}
            prefectureFunc = {prefectureUpdate}
          />
          <FilterHardness 
            hardnessFunc = {hardnessUpdate}/>
          <FilterSlider 
            lowerLimitFunc = {lowerLimitUpdate}
            higherLimitFunc = {higherLimitUpdate}/>
          <SubmitButton 
            currentView = {view}
            filterView = {toggleFilterView}
            resultsView = {toggleResultsView}
            weatherDataFunc = {getWeatherData}
            />
        </div>
      ) : (
        <div className>
          {/* ステートの初期化は実行されるけど見た目の初期化がうまく行かないので一旦消しておく */}
          {/* <FilterLocation 
            region = {regionArray}
            prefecture = {prefectureArray}
            regionFunc = {regionUpdate}
            prefectureFunc = {prefectureUpdate}
          />
          <FilterHardness 
            hardnessFunc = {hardnessUpdate}/>
          <FilterSlider 
            lowerLimitFunc = {lowerLimitUpdate}
            higherLimitFunc = {higherLimitUpdate}/> */}
          <SubmitButton 
            currentView = {view}
            filterView = {toggleFilterView}
            resultsView = {toggleResultsView}/>
          <Results 
            weatherData = {weatherInfo}/>
        </div>
      )}
    </div>
  );

//********************************************************************************************************
//*****************************************************Return*********************************************
//********************************************************************************************************

}
export default App;