import React, {useEffect, useState} from 'react';
import style from './style.scss';
import Button from "@/components/Button";
import WeatherCard from "@/components/WeatherCard";
import Rain from "@/assets/images/rain.webp";
import Showers from "@/assets/images/showers.webp";
import LightCloud from "@/assets/images/lightCloud.webp";
import HeavyCloud from "@/assets/images/heavyCloud.webp";
import Clear from "@/assets/images/clear.webp";
import ThunderStorm from "@/assets/images/thunderStorm.webp";
import Sleet from "@/assets/images/sleet.webp";
import Snow from "@/assets/images/snow.webp";
import TodayWeatherCard, {WeatherCardProps} from "@/components/TodayWeatherCard";

const getWeatherImage = (weatherState: string) => {
    switch (weatherState) {
        case 'Showers':
            return Showers
        case 'Light Rain':
        case 'Heavy Rain':
            return Rain;
        case 'Heavy Cloud':
            return HeavyCloud
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
            return LightCloud
    }
}

const Home = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [location, setLocation] = useState({error: '', title: '', location_type: ''});
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [today, setToday] = useState<WeatherCardProps>();
    const {error, title, location_type} = location;

    const onSubmitLocation = async (coords = "") => {
        try {
            setLoading(true)
            const response = coords ? await fetch(`/getLocation?lattlong=${coords}`) : await fetch(`/getLocation?location=${locationQuery}`);
            setLoading(false)
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
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    await onSubmitLocation(`${position.coords.latitude},${position.coords.longitude}`)
                }
            );
        }
    }, []);

    const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            await onSubmitLocation();
        }
    }

    const {weatherState} = today || {};

    return <div className={style.container}>
        <section style={{width: "100%"}} className={style.mainSection}>
            <div className={style.subSection}>
                <div className={style.searchSection}>
                    <input
                        type={"text"}
                        id={'location'}
                        name={'location'}
                        placeholder={'Type location'}
                        onChange={e => setLocationQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        disabled={loading}
                    />
                    <Button label={'Search'} onClick={_ => onSubmitLocation()}/>
                </div>
                <div className={style.searchSection} style={{height: "75px"}}>
                    {error && <div>Error: {error}</div>}
                    {loading && <div>Loading ... </div>}
                    {title && <div>Title: {title}</div>}
                    {location_type && <div>Location type: {location_type}</div>}
                </div>
            </div>
            <div className={style.subSection}>
                {
                    forecast.map((forecastData, idx) =>
                        <WeatherCard {...forecastData} key={idx}/>
                    )
                }
            </div>
        </section>
        {weatherState &&
        <div className={style.imageSection}>
            <div className={style.weatherCardSection}>
                <h2>Today: </h2>
                <div
                    className={style.responsive}
                    style={{backgroundImage: `url(${getWeatherImage(weatherState || '')})`}}>
                    <TodayWeatherCard {...today} />
                </div>
            </div>
        </div>}
    </div>;
}

export default Home;
