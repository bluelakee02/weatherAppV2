import * as React from 'react';

import style from './style.scss';

import Card from '@/components/Card';

interface Props {
    maxTemp: number;
    minTemp: number;
    weatherState: string;
    humidity: number;
    windSpeed: number;
    date: number;
    day: string;
    month: string;
    iconUrl: string;
}

const WeatherCard: React.FC<Props> = props => {
    const { iconUrl, weatherState, minTemp, maxTemp, day, month, date, humidity, windSpeed } = props;

    return (
        <Card>
            <div className={style.section}>
                <div className={style.subContainer}>
                    <h2>
                        {day} {month} {date}
                    </h2>
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
                <div className={style.subContainer}>
                    <h3>{weatherState}</h3>
                    <img className={style.icon} src={iconUrl} alt={'Weather icon'} />
                </div>
            </div>
            <div className={style.section}>
                <div className={style.subContainer}></div>
                <div className={style.subContainer}></div>
            </div>
        </Card>
    );
};

export default WeatherCard;
