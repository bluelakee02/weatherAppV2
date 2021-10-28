import * as React from 'react';

import style from './style.scss';

const Card: React.FC = props => {
    const { children } = props;

    return <div className={style.container}>{children}</div>;
};

export default Card;
