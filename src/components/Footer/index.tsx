import React from 'react';

import style from './style.scss';

const Footer: React.FC = () => (
    <footer className={style.footer}>
        <h2>blueLake 2020</h2>
        <div>
            Powered by{' '}
            <a href="https://www.weatherapi.com/" title="Free Weather API">
                WeatherAPI.com
            </a>
        </div>
    </footer>
);

export default Footer;
