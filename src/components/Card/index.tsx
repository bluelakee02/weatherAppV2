import * as React from "react";
import style from './style.scss';

interface CardProps {
    children
}
const Card = (props: CardProps) => {
  const {children} = props;

  return <div className={style.container}>
    {children}
  </div>
}

export default Card;
