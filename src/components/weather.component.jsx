import React from "react";
import "./weather.component.css";

const Weather = (props) => {
  return (
    <div>
      <div className="container weather-container text-light">
        <div className="cards pt-4">
          {props.city && (
            <>
              <h1>
                {props.city},{props.country}
              </h1>
              <h4 className="py-3">Last Updated : {props.date}</h4>
              <h5 className="py-1">
                <i className={`wi ${props.icon} display-1`}></i>
              </h5>
              <h1 className="py-4">{props.temp}&deg;</h1>
              <h3>
                <span className="px-4">{props.min}&deg;</span>
                <span className="px-4">{props.max}&deg;</span>
              </h3>
              <h4>
                <div>
                  Humidity : <span className="px-4">{props.humidity}%</span>
                </div>
                <div>
                  Pressure : <span className="px-4">{props.pressure} atm</span>
                </div>
              </h4>
              <h5 className="py-3">
                {props.description}
                <span>
                  <h6>{props.brief}</h6>
                </span>
              </h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Weather;
