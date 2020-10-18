import style from "./style.scss";
import React from "react";

export interface WeatherCardProps {
    maxTemp?: number,
    minTemp?: number,
    weatherState?: string,
    humidity?: number,
    windSpeed?: number,
    date?: number,
    day?: string,
    month?: string,
    theTemp?: string,
    iconUrl?: string,
}

const TodayWeatherCard = (props: WeatherCardProps) => {
    const {theTemp, iconUrl, weatherState, minTemp, maxTemp, day, month, date, humidity, windSpeed} = props;

    return <div className={style.container}>
        <div className={style.weatherCard}>
            <h2>{day} {month} {date}</h2>
            <h3>{weatherState}</h3>
            <span>Temperature: {theTemp} °C</span>
            <span>Max: {maxTemp} °C</span>
            <span>Min: {minTemp} °C</span>
            <span>Humidity: {humidity} %</span>
            <span>Wind: {windSpeed} kph</span>
        </div>
        <div className={style.weatherCardIcon}>
            <img className={style.icon} src={iconUrl} alt={"Weather icon"}/>
        </div>
    </div>
}

export default TodayWeatherCard;
