import React from 'react';

import style from './style.scss';

export interface Props {
    condition?: string;
    humidity?: number;
    windSpeed?: number;
    date?: number;
    day?: string;
    month?: string;
    temp?: string;
    iconUrl?: string;
}

const TodayWeatherCard: React.FC<Props> = props => {
    const { temp, iconUrl, condition, day, month, date, humidity, windSpeed } = props;

    return (
        <div className={style.container}>
            <div className={style.weatherCard}>
                <h2>
                    {day} {month} {date}
                </h2>
                <h3>{condition}</h3>
                <div>
                    <span>Temperature:</span> {temp} °C
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
