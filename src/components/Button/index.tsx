import style from './style.scss';
import * as React from 'react';

type ButtonProps = {classname?: string, label: string, onClick?, type?};

const Button = (props: ButtonProps) => (
    <button onClick={props.onClick} className={`${style.mainButton} ${props.classname ?? ''}`}>{props.label}</button>
);

export default Button;
