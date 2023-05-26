import PreloaderSVG from '../../assets/loader/Spin-1s-200px.svg'
import React from "react";

export default function Preloader() {
    return (
        <img className={'preloader'} src={PreloaderSVG} alt={'preloader'}/>
    )
}