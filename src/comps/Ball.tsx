import React, { ReactEventHandler } from "react";

import './Ball.css';

export default function Ball(
{
    bgColor,
    txColor,
    value = '',
    clickable = false,
    disabled = false,
    onClick
}: {
    bgColor: string,
    txColor: string,
    value?: string,
    clickable?: boolean,
    disabled?: boolean,
    onClick?: ReactEventHandler<HTMLElement>
}) {
    const cname = ['bt', clickable ? ' click' : '', disabled ? ' disabled' : ''].join('')
    return (
    <div 
        className={cname}
        style={{backgroundColor: bgColor, color: txColor}}
        onClick={onClick}
    >{value}</div>
    )
}