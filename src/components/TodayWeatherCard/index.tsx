import React from 'react';

import style from './style.scss';

export interface Props {
    maxTemp?: number;
    minTemp?: number;
    weatherState?: string;
    humidity?: number;
    windSpeed?: number;
    date?: number;
    day?: string;
    month?: string;
    theTemp?: string;
    iconUrl?: string;
}

const TodayWeatherCard: React.FC<Props> = props => {
    const { theTemp, iconUrl, weatherState, minTemp, maxTemp, day, month, date, humidity, windSpeed } = props;

    return (
        <div className={style.container}>
            <div className={style.weatherCard}>
                <h2>
                    {day} {month} {date}
                </h2>
                <h3>{weatherState}</h3>
                <div>
                    <span>Temperature:</span> {theTemp} °C
                </div>
                <div>
                    <span>Max:</span> {maxTemp} °C
                </div>
                <div>
                    <span>Min:</span> {minTemp} °C
                </div>
                <div>
                    <span>Humidity:</span> {humidity} %
                </div>
                <div>
                    <span>Wind:</span> {windSpeed} kph
                </div>
            </div>
            <div className={style.weatherCardIcon}>
                <img className={style.icon} src={iconUrl} alt={'Weather icon'} />
            </div>
        </div>
    );
};

export default TodayWeatherCard;
