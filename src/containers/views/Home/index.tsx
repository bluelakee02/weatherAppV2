import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';

import style from './style.scss';

import Clear from '@/assets/images/clear.webp';
import HeavyCloud from '@/assets/images/heavyCloud.webp';
import LightCloud from '@/assets/images/lightCloud.webp';
import Rain from '@/assets/images/rain.webp';
import Showers from '@/assets/images/showers.webp';
import Sleet from '@/assets/images/sleet.webp';
import Snow from '@/assets/images/snow.webp';
import ThunderStorm from '@/assets/images/thunderStorm.webp';
import Button from '@/components/Button';
import TodayWeatherCard, { Props } from '@/components/TodayWeatherCard';
import WeatherCard from '@/components/WeatherCard';

const getWeatherImage = (weatherState: string) => {
    switch (weatherState) {
        case 'Showers':
            return Showers;
        case 'Light Rain':
        case 'Heavy Rain':
            return Rain;
        case 'Heavy Cloud':
            return HeavyCloud;
        case 'Clear':
            return Clear;
        case 'Thunderstorm':
            return ThunderStorm;
        case 'Hail':
        case 'Sleet':
            return Sleet;
        case 'Snow':
            return Snow;
        default:
            return LightCloud;
    }
};

const Home: React.FC<RouteComponentProps> = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [location, setLocation] = useState({ error: '', title: '', location_type: '' });
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [today, setToday] = useState<Props>();
    const { error, title } = location;

    const onSubmitLocation = async (coords = '') => {
        try {
            setLoading(true);
            const response = coords ? await fetch(`/getLocation?lattlong=${coords}`) : await fetch(`/getLocation?location=${locationQuery}`);
            setLoading(false);
            const data = await response.json();
            const [locationData, today, ...forecastData] = data;
            setLocation(locationData);
            setToday(today);
            setForecast(forecastData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                await onSubmitLocation(`${position.coords.latitude},${position.coords.longitude}`);
            });
        }
    }, []);

    const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            await onSubmitLocation();
        }
    };

    const { weatherState } = today || {};

    return (
        <div className={style.container}>
            <section className={style.mainSection}>
                <div className={style.subSection}>
                    <div className={style.searchSection}>
                        <input
                            type={'text'}
                            id={'location'}
                            name={'location'}
                            placeholder={'Type location'}
                            onChange={e => setLocationQuery(e.target.value)}
                            onKeyDown={onKeyDown}
                            disabled={loading}
                        />
                        <Button classname={style.button} label={'Search'} onClick={() => onSubmitLocation()} />
                        <div className={style.searchSection} style={{ height: '16px' }}>
                            {loading && <div>Loading ... </div>} {error && <div>Error: {error}</div>}
                        </div>
                    </div>
                </div>
                {weatherState && (
                    <div className={style.weatherCardSection}>
                        <div className={style.responsive} style={{ backgroundImage: `url(${getWeatherImage(weatherState || '')})` }}>
                            <h2 className={style.title}>{title} Today: </h2>
                            <TodayWeatherCard {...today} />
                        </div>
                    </div>
                )}
            </section>
            <section className={style.forecastSection}>
                <div className={style.subSection}>
                    {forecast.map((forecastData, idx) => (
                        <WeatherCard {...forecastData} key={idx} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
