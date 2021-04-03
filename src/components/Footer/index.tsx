import style from './style.scss';
import React from 'react';

const Footer = () =>
  <footer className={style.footer}>
    <h2>
            blueLake 2020
    </h2>
    <div>
      <span>thx to </span>
      <a
        href={"https://www.metaweather.com/"}
        rel="noopener, noreferrer"
        target={"_blank"}>MetaWeather</a>
    </div>
  </footer>

export default Footer
