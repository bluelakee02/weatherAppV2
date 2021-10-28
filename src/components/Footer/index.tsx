import React from 'react';

import style from './style.scss';

const Footer: React.FC = () => (
    <footer className={style.footer}>
        <h2>blueLake 2020</h2>
        <div>
            <span>thx to </span>
            <a href={'https://www.metaweather.com/'} rel="noopener, noreferrer" target={'_blank'}>
                MetaWeather
            </a>
        </div>
    </footer>
);

export default Footer;
