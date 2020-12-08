import React from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RangeSlider from 'react-bootstrap-range-slider';
import "./Filter.css";
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
 
export default function FilterSlider(props){
 
    const [ value1, setValue1 ] = React.useState(0);
    const [ value2, setValue2 ] = React.useState(3667);
    const [ minValue, setMinValue ] = React.useState(0)
    const [ maxValue, setMaxValue ] = React.useState(3667)

    props.lowerLimitFunc(minValue)
    props.higherLimitFunc(maxValue)

    return (
        <div className = "Container">
            <div className="stepTitle">STEP3 - Choose Height</div>
            <span className="min">Min:{minValue}</span>
            <div className = "slider">
                <RangeSlider
                    value = {value1}
                    min = {0}
                    max = {3667}
                    step = {100}
                    className = "test"
                    onChange = {(e) => setValue1(e.target.value)}
                    onAfterChange = {(e) => setMinValue(e.target.value)}
                />
            </div>
            <span className="max">Max:{maxValue}</span>
            <div className = "slider">
                <RangeSlider
                    value = {value2}
                    min = {0}
                    max = {3700}
                    step = {100}
                    className = "test"
                    onChange = {(e) => setValue2(e.target.value)}
                    // onChange = {(e) => props.higherLimitFunc(e.target.value)}
                    onAfterChange = {(e) => setMaxValue(e.target.value)}
                    // onAfterChange = {(e) => props.higherLimitFunc(e.target.value)}
                />
            </div>
            
        </div>
    );
};