import React, {useEffect, useState} from 'react';
import style from './style.scss';
import Button from "@/components/Button";
import WeatherCard from "@/components/WeatherCard";

const Home = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [location, setLocation] = useState({error: '', title: '', location_type: ''});
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const {error, title, location_type} = location;

    const onSubmitLocation = async (coords = "") => {
        try {
            setLoading(true)
            const response = coords ? await fetch(`/getLocation?lattlong=${coords}`) : await fetch(`/getLocation?location=${locationQuery}`);
            setLoading(false)
            const data = await response.json();
            const [locationData, ...forecastData] = data;
            setLocation(locationData);
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

    return <div className={style.container}>
        <section style={{width: "100%"}}>
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
    </div>;
}

export default Home;
