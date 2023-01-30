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
        case 'Patchy rain possible':
            return Rain;
        case 'Heavy Cloud':
        case 'Cloudy':
        case 'Overcast':
            return HeavyCloud;
        case 'Sunny':
        case 'Clear':
            return Clear;
        case 'Thunderstorm':
        case 'Thundery outbreaks possible':
            return ThunderStorm;
        case 'Hail':
        case 'Sleet':
        case 'Fog':
        case 'Patchy freezing drizzle possible':
            return Sleet;
        case 'Snow':
        case 'Blowing snow':
        case 'Blizzard':
        case 'Patchy snow possible':
            return Snow;
        default:
            return LightCloud;
    }
};

const Home: React.FC<RouteComponentProps> = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [location, setLocation] = useState({ error: undefined, name: '' });
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [today, setToday] = useState<Props>();
    const { error, name } = location;

    const onSubmitLocation = async (coords = '') => {
        try {
            setLoading(true);
            const response = await fetch(`/getLocation?location=${coords ? coords : locationQuery}`);
            setLoading(false);
            const data = await response.json();
            const [locationData, today, ...forecastData] = data;
            setLocation(locationData);
            setToday(today[0]);
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

    const { condition } = today || {};

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
                {condition && (
                    <div className={style.weatherCardSection}>
                        <div className={style.responsive} style={{ backgroundImage: `url(${getWeatherImage(condition || '')})` }}>
                            <h2 className={style.title}>{name} Today: </h2>
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
