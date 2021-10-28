import * as React from 'react';

import style from './style.scss';

interface Props {
    classname?: string;
    label: string;
    onClick?: () => Promise<void>;
    type?: React.ButtonHTMLAttributes<null>['type'];
}

const Button: React.FC<Props> = props => (
    <button type={props.type} onClick={props.onClick} className={`${style.mainButton} ${props.classname ?? ''}`}>
        {props.label}
    </button>
);

export default Button;
